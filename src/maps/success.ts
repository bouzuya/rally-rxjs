import { O, A } from 'b-o-a';

import { State } from '../property-type/state';
import {
  from as responseStampRallyShow$
} from '../action/response-stamp-rally-show';
import { from as responseTokenCreate$ } from '../action/response-token-create';
import {
  create as successSignIn
} from '../action/success-sign-in';
import {
  create as successStampRallyShow
} from '../action/success-stamp-rally-show';

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
