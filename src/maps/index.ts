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
} from '../actions/sign-in';

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
} from '../actions/add-spot';

import {
  from as responseSpotCreate$
} from '../actions/response-spot-create';

import {
  from as changeName2$
} from '../actions/views/stamp-rally-form/change-name';
import {
  create as changeName2
} from '../actions/props/stamp-rally-form/change-name';

import {
  from as addStampRally$
} from '../actions/views/stamp-rally-form/add-stamp-rally';
import {
  create as addStampRally
} from '../actions/add-stamp-rally';

import {
  from as responseStampRallyCreate$
} from '../actions/response-stamp-rally-create';

import {
  from as responseSpotIndex$
} from '../actions/response-spot-index';
import {
  create as resetSpots
} from '../actions/props/spots/reset';

import {
  from as responseStampRallyIndex$
} from '../actions/response-stamp-rally-index';
import {
  create as resetStampRallies
} from '../actions/props/stamp-rallies/reset';

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
    responseSpotCreate$(action$).map(() => changeName(null)),

    changeName2$(action$).map(({ value }) => changeName2(value)),
    addStampRally$(action$).map(() => addStampRally()),
    responseStampRallyCreate$(action$).map(() => changeName2(null)),

    responseSpotIndex$(action$).map(spots => resetSpots(spots)),
    responseStampRallyIndex$(action$)
      .map(stampRallies => resetStampRallies(stampRallies))
  );
};

export { $ };
