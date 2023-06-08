import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';

import { TaskMember } from './task.member.model';
import { ProjectTaskMember } from './project.task.member.model';

@Injectable()
export class TasksService {
  projectTaskMember: ProjectTaskMember;
  readonly BaseURI = 'https://managerapi20230607104733.azurewebsites.net/api/manager/';
  token = localStorage.getItem('jwt');

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  addTaskMember(obj: TaskMember) {
    this.http
      .post(this.BaseURI + 'AssignTask', obj, this.httpOptions)
      .subscribe({
        next: (result: any) => console.log(result),
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  getTaskMembers(memberId: string, taskName: string) {
    this.http
      .get(
        'http://localhost:8010/Member/list/' + memberId + '/' + taskName,
        this.httpOptions
      )
      .subscribe({
        next: (result: any) => (this.projectTaskMember = result),
        error: (err: HttpErrorResponse) => console.log(err),
      });

    return this.projectTaskMember;
  }
}
