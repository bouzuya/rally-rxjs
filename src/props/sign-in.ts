import { A, O } from 'b-o-a';

import { Updater } from '../types/updater';

import { SignIn } from '../types/sign-in';
import changeEmail$ from './sign-in/change-email';
import changePassword$ from './sign-in/change-password';
import reset$ from './sign-in/reset';

export default function property(
  state: SignIn,
  action$: O<A<any>>
): O<SignIn> {
  return O
    .of(state)
    .merge(
      changeEmail$(action$),
      changePassword$(action$),
      reset$(action$)
    )
    .scan((state: SignIn, updater: Updater<SignIn>) => {
      return updater(state);
    });
};
