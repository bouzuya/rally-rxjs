import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { from as changeEmail$ } from '../../actions/change-email';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return changeEmail$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { email: value });
    });
}
