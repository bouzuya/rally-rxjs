import { A, O } from 'b-o-a';

import { Updater } from '../../property-types/updater';

import { from as changePassword$ } from '../../actions/change-password';
import { SignIn } from '../../property-types/sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return changePassword$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { password: value });
    });
}
