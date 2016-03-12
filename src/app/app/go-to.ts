import { O, A } from 'b-o-a';

import { create as goTo } from '../action/go-to';

import { State } from '../property-type/state';
import { from as successSignIn$ } from '../action/success-sign-in';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return successSignIn$(action$)
    .map(() => goTo('/stamp_rallies'));
};

export { $ };
