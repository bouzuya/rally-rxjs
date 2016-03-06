import { O, A } from 'b-o-a';

import { create as goTo } from '../framework/executors/history/go-to-action';
import { from as successSignIn$ } from './actions/success-sign-in';

export default function make(
  action$: O<A<any>>
): O<A<any>> {
  return successSignIn$(action$)
    .map(() => goTo('/stamp_rallies'));
}