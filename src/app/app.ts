import { A, O } from 'b-o-a';

import { create as render } from './actions/render';

import { State } from './models/state';

import makeGoTo from './go-to';
import makeOther from './other';
import makeRequest from './request';
import makeResponse from './response';
import makeState from './properties/all';

export default function app(
  action$: O<A<any>>,
  options: {
    state: State
  }
): O<A<any>> {
  const { state } = options;
  const state$ = makeState(action$, state);
  return O
    .merge(
      makeGoTo(action$),
      makeOther(action$),
      state$.map(render),
      makeRequest(action$, state$),
      makeResponse(action$)
    )
    .share();
};
