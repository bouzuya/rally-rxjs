import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { is as isGoToSignIn } from '../../actions/go-to-sign-in';
import { is as isSuccessSignIn } from '../../actions/success-sign-in';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SignIn>> {
  return Observable
    .merge(
      action$.filter(isSuccessSignIn),
      action$.filter(isGoToSignIn)
    )
    .map(() => (signIn: SignIn): SignIn => {
      return { email: null, password: null };
    });
}
