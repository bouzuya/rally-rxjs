import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action>,
  reaction: (action: Action) => void
): Observable<Updater<SignIn>> {
  return action$
    .filter(({ type }) => type === 'sign-in')
    .map(() => (signIn: SignIn): SignIn => {
      reaction({ type: 'request-sign-in', params: signIn });
      return signIn;
    });
}
