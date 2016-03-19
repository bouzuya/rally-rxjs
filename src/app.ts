import { A, O } from 'b-o-a';

import { State } from './types/state';

import { $ as map$ } from './maps/';
import { $ as goTo$ } from './maps/go-to';
import { $ as init$ } from './maps/init';
import { $ as render$ } from './maps/render';
import { $ as request$ } from './maps/request';
import { $ as success$ } from './maps/success';
import { $ as properties } from './props/';

const handler = (
  action$: O<A<any>>,
  options: {
    state?: State
  }
): O<A<any>> => {
  const { state: initialState } = options;
  const state$ = properties(action$, initialState);
  return O.merge(
    map$(action$, state$),
    goTo$(action$, state$),
    init$(action$, state$),
    // TODO: type is specified in client or server.
    render$(action$, state$, { type: 'render' }),
    // TODO: type is specified in client or server.
    request$(action$, state$, { type: 'request' }),
    success$(action$, state$)
  )
    .share();
};

const init = () => {
  return { handler };
};

export { init };
