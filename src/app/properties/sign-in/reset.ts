import { A, O } from 'b-o-a';
import {
  from as route$
} from '../../../executors/history/route-action';

import { Updater } from '../../models/updater';
import { SignIn } from '../../models/sign-in';

import { from as successSignIn$ } from '../../actions/success-sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return O
    .merge(
      route$(action$)
        .filter(({ name }) => name === 'sign_in#index'),
      successSignIn$(action$)
    )
    .map(() => (signIn: SignIn): SignIn => {
      return { email: null, password: null };
    });
}
