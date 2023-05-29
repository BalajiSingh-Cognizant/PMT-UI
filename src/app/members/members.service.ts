import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable()
export class MembersService {
  membersListChanged = new Subject<Member[]>();
  private membersList: Member[];

  readonly BaseURI = 'http://localhost:8010/manager/';
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

  addMember(member: Member) {
    this.membersList.push(member);
    this.membersListChanged.next(this.membersList.slice());
  }
}
