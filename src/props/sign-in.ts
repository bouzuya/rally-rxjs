import { A, O } from 'b-o-a';

import {
  from as changeEmail$
} from '../actions/props/sign-in/change-email';
import {
  from as changePassword$
} from '../actions/props/sign-in/change-password';
import {
  from as reset$
} from '../actions/props/sign-in/reset';

import { SignIn } from '../types/sign-in';
import { Updater } from '../types/updater';

export default function property(
  state: SignIn,
  action$: O<A<any>>
): O<SignIn> {
  return O
    .of(state)
    .merge(
      changeEmail$(action$)
        .map(({ value }) => (state: SignIn): SignIn => {
          return Object.assign({}, state, { email: value });
        }),
      changePassword$(action$)
        .map(({ value }) => (state: SignIn): SignIn => {
          return Object.assign({}, state, { password: value });
        }),
      reset$(action$)
        .map(() => (state: SignIn): SignIn => {
          return { email: null, password: null };
        })
    )
    .scan((state: SignIn, updater: Updater<SignIn>) => {
      return updater(state);
    });
};
