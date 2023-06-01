import { Component } from '@angular/core';

import { ProjectTaskMember } from './project.task.member.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  projectTaskMember: ProjectTaskMember;
  memberdetails: string;
  taskdetails: string;

  constructor(private tasksService: TasksService) {}

  getTasks() {
    this.projectTaskMember = this.tasksService.getTaskMembers(
      this.memberdetails,
      this.taskdetails
    );
  }
}
