import { A, O } from '../../../framework/o-a';

import { Updater } from '../../models/updater';

import { from as changePassword$ } from '../../actions/change-password';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return changePassword$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { password: value });
    });
}
