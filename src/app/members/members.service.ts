import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { Subject } from 'rxjs';

@Injectable()
export class MembersService {
  membersListChanged = new Subject<Member[]>();
  private membersList: Member[] = [
    new Member(
      'Karhtik',
      '8',
      [
        'Eating Head',
        'Cooking ok ok',
        'Always watching DisnepplusHotstar',
        'Enjoy enjome',
      ],
      'No.1 Stupid fellow',
      '0',
      '2021-02-27T10:18:24.188Z',
      '2023-05-09T17:18:24.188Z'
    ),
    new Member(
      'Balaji',
      '10',
      ['Angular', 'DOTNET', 'Mobile App Development', 'Enjoy enjome'],
      'Smart but..',
      '0',
      '2022-02-27T10:18:24.188Z',
      '2023-05-09T17:18:24.188Z'
    ),
  ];

  getMembers() {
    return this.membersList.slice();
  }

  getMember(index: number) {
    return this.membersList[index];
  }

  addMember(member: Member) {
    this.membersList.push(member);
    this.membersListChanged.next(this.membersList.slice());
  }
}
