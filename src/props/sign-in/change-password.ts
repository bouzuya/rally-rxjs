import { A, O } from 'b-o-a';

import { Updater } from '../../types/updater';

import {
  from as changePassword$
} from '../../actions/view/change-sign-in-form-password';
import { SignIn } from '../../types/sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return changePassword$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { password: value });
    });
}
