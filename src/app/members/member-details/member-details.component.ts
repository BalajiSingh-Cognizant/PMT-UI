import { Component, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member;
  id: number;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.member = this.memberService.getMember(this.id);
    });
  }
}
