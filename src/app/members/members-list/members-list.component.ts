import { Component, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { MembersService } from '../members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  members: Member[] = [];
  subscription: Subscription;

  constructor(
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.membersService.membersListChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
    this.members = this.membersService.getMembers();
  }

  addNewMember() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
