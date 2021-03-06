import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  currentid = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentid = Number(this.route.snapshot.paramMap.get('id'));
    

  }

}
