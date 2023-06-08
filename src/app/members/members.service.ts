import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Member, MemberModel } from './member.model';

@Injectable()
export class MembersService {
  membersListChanged = new Subject<Member[]>();
  private membersList: Member[];
  private member: MemberModel;

  readonly BaseURI = 'https://managerapi20230607104733.azurewebsites.net/api/manager';
  token = localStorage.getItem('jwt');
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getMembers() {
    // return this.membersList.slice();
    const members = this.http
      .get<Member[]>(this.BaseURI + 'GetMembers', this.httpOptions)
      .subscribe({
        next: (result: any) => (this.membersList = result),
        error: (err: HttpErrorResponse) => console.log(err),
      });

    return this.membersList;
  }

  getMember(index: number) {
    return this.membersList[index];
  }

  addMember(newmember: Member) {
    this.member = {
      name: newmember.name,
      memberId: newmember.memberId,
      description: newmember.description,
      experience: newmember.experience,
      allocationPercentage: newmember.allocationPercentage,
      skills: newmember.skills,
      startDate: newmember.startDate,
      endDate: newmember.endDate,
    };

    this.http
      .post(this.BaseURI + 'AddMember', this.member, this.httpOptions)
      .subscribe({
        next: (result: any) =>
          this.membersListChanged.next(this.membersList.slice()),
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  updateAllocation(percentage: string) {
    this.http
      .put(this.BaseURI + 'UpdateAllocation/' + percentage, this.httpOptions)
      .subscribe({
        next: (result: any) =>
          this.membersListChanged.next(this.membersList.slice()),
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }
}
