import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { SignIn } from '../models/sign-in';
import changeEmail$ from './sign-in/change-email';
import changePassword$ from './sign-in/change-password';
import reset$ from './sign-in/reset';
import signIn$ from './sign-in/sign-in';

export default function property(
  state: SignIn,
  action$: Observable<Action>,
  reaction: (action: Action) => void
): Observable<SignIn> {
  return Observable
    .of(state)
    .merge(
      changeEmail$(action$),
      changePassword$(action$),
      reset$(action$),
      signIn$(action$, reaction)
    )
    .scan((state: SignIn, updater: Updater<SignIn>) => {
      return updater(state);
    });
};
