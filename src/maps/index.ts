import { O, A } from 'b-o-a';

import { State } from '../types/state';

import {
  from as changeEmail$
} from '../actions/views/sign-in-page/change-email';
import {
  create as changeEmail
} from '../actions/props/sign-in/change-email';

import {
  from as changePassword$
} from '../actions/views/sign-in-page/change-password';
import {
  create as changePassword
} from '../actions/props/sign-in/change-password';

import {
  from as signIn$
} from '../actions/views/sign-in-page/sign-in';
import {
  create as signIn
} from '../actions/views/sign-in';

import {
  from as route$
} from '../actions/route';
import {
  from as successSignIn$
} from '../actions/success-sign-in';
import {
  create as reset
} from '../actions/props/sign-in/reset';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return O.merge(
    changeEmail$(action$).map(({ value }) => changeEmail(value)),
    changePassword$(action$).map(({ value }) => changePassword(value)),
    signIn$(action$).map(() => signIn()),
    route$(action$)
      .filter(({ route: { name } }) => name === 'sign_in#index')
      .map(() => reset()),
    successSignIn$(action$).map(() => reset())
  );
};

export { $ };
