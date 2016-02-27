import { O, A } from '../framework/o-a';

import { create as goTo } from './actions/go-to';
import { from as successSignInAction$ } from './actions/success-sign-in';

export default function make(
  action$: O<A<any>>
): O<A<any>> {
  return successSignInAction$(action$)
    .map(() => goTo('/stamp_rallies'));
}