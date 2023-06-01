import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskMember } from '../task.member.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css'],
})
export class AssignTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskMember: TaskMember;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  OnSubmit() {
    this.taskMember = {
      taskName: this.taskForm.value['name'],
      taskId: this.taskForm.value['id'],
      memberName: this.taskForm.value['membName'],
      memberId: this.taskForm.value['membId'],
      startDate: this.taskForm.value['sDate'],
      endDate: this.taskForm.value['eDate'],
      deliverables: this.taskForm.value['desc'],
    };

    this.tasksService.addTaskMember(this.taskMember);
    this.onCancel();
  }

  private initForm() {
    let taskName = '';
    let taskId = '';
    let memberName = '';
    let memberId = '';
    let memberStartDate = new Date();
    let memberEndDate = new Date();
    let description = '';

    this.taskForm = new FormGroup({
      name: new FormControl(taskName, [Validators.required]),
      id: new FormControl(taskId, [Validators.required]),
      membName: new FormControl(memberName, [Validators.required]),
      membId: new FormControl(memberId, [Validators.required]),
      sDate: new FormControl(memberStartDate, [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
      eDate: new FormControl(memberEndDate, [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
      desc: new FormControl(description, [Validators.required]),
    });
  }
}
