import { A, O } from 'b-o-a';

import { State } from './property-type/state';

import { $ as goTo$ } from './maps/go-to';
import { $ as init$ } from './maps/init';
import { $ as render$ } from './maps/render';
import { $ as request$ } from './maps/request';
import { $ as success$ } from './maps/success';
import { $ as properties } from './property/';

const handler = (
  action$: O<A<any>>,
  options: {
    state?: State
  }
): O<A<any>> => {
  const { state: initialState } = options;
  const state$ = properties(action$, initialState);
  return O.merge(
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
