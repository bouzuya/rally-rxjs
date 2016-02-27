import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';
import { filter as routeAction } from '../../../framework/route-action';

import { Updater } from '../../models/updater';
import { SignIn } from '../../models/sign-in';

import { is as isSuccessSignIn } from '../../actions/success-sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return Observable
    .merge(
      routeAction(action$)
        .filter(({ name }) => name === 'sign_in#index'),
      action$.filter(isSuccessSignIn)
    )
    .map(() => (signIn: SignIn): SignIn => {
      return { email: null, password: null };
    });
}
