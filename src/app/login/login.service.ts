import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoginModel } from './login.model';
// import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  currentUser$ = new Subject<LoginModel>();
  // currentUser$ = new BehaviorSubject<
  //   { id: string; name: string } | null | undefined
  // >(undefined);
  // setCurrentUser() {
  //   if (localStorage.getItem('jwt')) {
  //     this.currentUser$.next({ id: '1', name: 'Foo' });
  //   } else {
  //     this.currentUser$.next(null);
  //   }
  // }
}
