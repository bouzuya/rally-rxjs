import { O, A } from 'b-o-a';

import { create as goTo } from '../actions/go-to';

import { State } from '../types/state';
import { from as successSignIn$ } from '../actions/success-sign-in';

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return successSignIn$(action$)
    .map(() => goTo('/stamp_rallies'));
};

export { $ };
