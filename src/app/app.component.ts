import { Component, OnInit, Inject } from '@angular/core';
import { Task } from './tasks/task';
import { Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import {  Observable } from 'rxjs';
import { filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eZY-Money';
  public isAuthenticated$!: Observable<boolean>;
  constructor(private _router: Router, 
     public _oktaStateService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }


  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/profile'])
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

  todo: Task[] = [
    {
      id:'22212',
      title: 'User request 22212'
    },
    {
      id:'12121',
      title: 'User request 12121'
    }
  ];
  inProgress: Task[] = [  {
    id: '14144',
    title: 'User request 14144'
  },
  {
    id: '45451',
    title: 'User request 45451',
    amount: 5000
  }];
  done: Task[] = [  {
    id: '36363',
    title: 'User request 36363',
    amount: 1000
  },
  {
    id: '79797',
    title: 'User request 79797',
    amount: 4000
  }];
  isLoggedin = true;
  isAdmin = true;

  loginPara(){
    this.isLoggedin = !this.isLoggedin
  }

  adminPara() {
    this.isAdmin = !this.isAdmin;
  }

  editTask(list: string, task: Task): void {}

  drop(event: CdkDragDrop<Task[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  newTask() {
    // const dialogRef = this.dialog.open(TaskDialogComponent, {
    //   width: '270px',
    //   data: {
    //     task: {},
    //   },
    // });
    // dialogRef
    //   .afterClosed()
    //   .subscribe((result: TaskDialogResult|undefined) => {
    //     if (!result) {
    //       return;
    //     }
    //     this.todo.push(result.task);
    //   });
  }
}
