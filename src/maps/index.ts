import { O, A } from 'b-o-a';

import { State } from '../types/state';

import {
  from as changeEmail$
} from '../actions/views/sign-in-page/change-email';
import {
  create as changeSignInFormEmail
} from '../actions/views/change-sign-in-form-email';

import {
  from as changePassword$
} from '../actions/views/sign-in-page/change-password';
import {
  create as changeSignInFormPassword
} from '../actions/views/change-sign-in-form-password';

import {
  from as signIn$
} from '../actions/views/sign-in-page/sign-in';
import {
  create as signIn
} from '../actions/views/sign-in';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return O.merge(
    changeEmail$(action$).map(({ value }) => changeSignInFormEmail(value)),
    changePassword$(action$).map(({ value }) => changeSignInFormPassword(value)),
    signIn$(action$).map(() => signIn())
  );
};

export { $ };
