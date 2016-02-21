import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action>
): Observable<Updater<SignIn>> {
  return action$
    .filter(({ type }) => type === 'change-password')
    .map(({ params: { value } }) => (state: SignIn) => {
      return Object.assign({}, state, { password: value });
    });
}
