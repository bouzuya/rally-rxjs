import { A, O } from '../framework/o-a';
import run from '../framework/client';

import dom from '../framework/executors/dom-executor';
import history from '../framework/executors/history-executor';
import state from '../framework/executors/state-executor';
import { create as render } from './actions/render';

import { routes } from './routes/all';
import { State } from './models/state';

import view from './views/app';

import makeGoTo from './go-to';
import makeOther from './other';
import makeRequest from './request';
import makeResponse from './response';
import makeState from './properties/all';

const app = (
  action$: O<A<any>>,
  options: {
    state: State
  }
): O<A<any>> => {
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

export default function main() {
  run(
    app,
    [
      state(),
      dom('div#app', view),
      history(routes)
    ]
  );
}
