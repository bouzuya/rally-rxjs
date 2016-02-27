import { O, A } from '../framework/o-a';

import { State } from './models/state';

import { create as renderAction } from './actions/render';

export default function make(state$: O<State>): O<A<any>> {
  return state$.map(renderAction);
}