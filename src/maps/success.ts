import { O, A } from 'b-o-a';

import { State } from '../property-type/state';
import {
  from as responseStampRallyShow$
} from '../actions/response-stamp-rally-show';
import { from as responseTokenCreate$ } from '../actions/response-token-create';
import {
  create as successSignIn
} from '../actions/success-sign-in';
import {
  create as successStampRallyShow
} from '../actions/success-stamp-rally-show';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return O
    .merge(
      responseStampRallyShow$(action$)
        .map(successStampRallyShow),
      responseTokenCreate$(action$)
        .map(successSignIn)
    );
};

export { $ };
