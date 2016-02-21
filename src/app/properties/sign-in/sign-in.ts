import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { create } from '../../actions/request-sign-in';
import { is } from '../../actions/sign-in';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<SignIn>> {
  return action$
    .filter(is)
    .map(() => (signIn: SignIn): SignIn => {
      reaction(create(signIn));
      return signIn;
    });
}
