import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { from as changePassword$ } from '../../actions/change-password';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return changePassword$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { password: value });
    });
}
