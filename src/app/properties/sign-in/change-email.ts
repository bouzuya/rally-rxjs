import { A, O } from '../../../framework/o-a';

import { Updater } from '../../models/updater';

import { from as changeEmail$ } from '../../actions/change-email';
import { SignIn } from '../../models/sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return changeEmail$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { email: value });
    });
}
