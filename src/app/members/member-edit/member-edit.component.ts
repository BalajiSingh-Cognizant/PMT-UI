import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Member } from '../member.model';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  id: number;
  editMode = false;
  memberForm: FormGroup;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  OnSubmit() {
    const newMember = new Member(
      this.memberForm.value['name'],
      this.memberForm.value['description'],
      this.memberForm.value['skills'],
      this.memberForm.value['allocation'],
      this.memberForm.value['experience'],
      this.memberForm.value['startDate'],
      this.memberForm.value['endDate']
    );

    this.memberService.addMember(this.memberForm.value);
    this.onCancel();
  }

  onDeleteSkill(index: number) {
    (<FormArray>this.memberForm.get('skills')).removeAt(index);
  }

  OnAddSkill() {
    (<FormArray>this.memberForm.get('skills')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  get controls() {
    return (<FormArray>this.memberForm.get('skills')).controls;
  }

  private initForm() {
    let memberName = '';
    let memberDescription = '';
    let memberExperience = '';
    let skills = new FormArray([]);
    let memberStartDate = new Date();
    let memberEndDate = new Date();

    this.memberForm = new FormGroup({
      name: new FormControl(memberName, [Validators.required]),
      imagePath: new FormControl(memberExperience, [Validators.required]),
      description: new FormControl(memberDescription, [Validators.required]),
      skills: skills,
      startDate: new FormControl(memberStartDate, [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
      endDate: new FormControl(memberEndDate, [
        Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
    });
  }
}
