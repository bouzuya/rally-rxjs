import { A, O } from 'b-o-a';

import { Updater } from '../../property-type/updater';

import {
  from as changeEmail$
} from '../../actions/change-sign-in-form-email';
import { SignIn } from '../../property-type/sign-in';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SignIn>> {
  return changeEmail$(action$)
    .map(({ value }) => (state: SignIn) => {
      return Object.assign({}, state, { email: value });
    });
}
