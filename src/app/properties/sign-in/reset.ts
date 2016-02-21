import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action>
): Observable<Updater<SignIn>> {
  return action$
    .filter(({ type }) => type === 'success-sign-in')
    .map(() => (signIn: SignIn): SignIn => {
      return { email: null, password: null };
    });
}
