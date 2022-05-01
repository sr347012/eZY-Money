import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AppComponent } from './app.component';

const routes: Routes = [ 

{
  path: 'task/:id',
  component: TaskDetailComponent
},
{
  path: '',
  component: TasksComponent
},
{
  path: 'login/callback',
  component: OktaCallbackComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
