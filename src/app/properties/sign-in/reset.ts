import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/success-sign-in';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return action$
    .filter(is)
    .map(() => (signIn: SignIn): SignIn => {
      return { email: null, password: null };
    });
}
