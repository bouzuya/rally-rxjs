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

import {
  from as changeName$
} from '../actions/views/spot-form/change-name';
import {
  create as changeName
} from '../actions/props/spot-form/change-name';

import {
  from as addSpot$
} from '../actions/views/spot-form/add-spot';
import {
  create as addSpot
} from '../actions/views/add-spot';

import {
  from as responseSpotCreate$
} from '../actions/response-spot-create';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return O.merge(
    changeEmail$(action$).map(({ value }) => changeEmail(value)),
    changePassword$(action$).map(({ value }) => changePassword(value)),
    signIn$(action$).map(() => signIn()),
    route$(action$)
      .filter(({ route: { name } }) => name === 'sign_in#index')
      .map(() => reset()),
    successSignIn$(action$).map(() => reset()),
    changeName$(action$).map(({ value }) => changeName(value)),
    addSpot$(action$).map(() => addSpot()),
    responseSpotCreate$(action$).map(() => changeName(null))
  );
};

export { $ };
