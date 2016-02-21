import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/change-email';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return action$
    .filter(is)
    .map(({ params: { value } }) => (state: SignIn) => {
      return Object.assign({}, state, { email: value });
    });
}
