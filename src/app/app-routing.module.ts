import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { UpdateAllocationComponent } from './members/update-allocation/update-allocation.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'members',
    component: MembersComponent,
    children: [
      { path: 'new', component: MemberEditComponent },
      { path: ':id', component: MemberDetailsComponent },
    ],
    canActivate: [authGuard],
  },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  {
    path: 'allocation',
    component: UpdateAllocationComponent,
    canActivate: [authGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
