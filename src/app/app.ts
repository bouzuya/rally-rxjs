import { A, O } from 'b-o-a';

import { State } from './property-type/state';

import { $ as goTo$ } from './app/go-to';
import { $ as init$ } from './app/init';
import { $ as render$ } from './app/render';
import { $ as request$ } from './app/request';
import { $ as success$ } from './app/success';
import { $ as properties } from './property/';

export default function app(
  action$: O<A<any>>,
  options: {
    state: State
  }
): O<A<any>> {
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
