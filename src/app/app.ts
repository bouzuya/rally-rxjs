import { A, O } from 'b-o-a';

import { State } from './property-types/state';

import { $ as goTo$ } from './app/go-to';
import { $ as init$ } from './app/init';
import { $ as render$ } from './app/render';
import { $ as request$ } from './app/request';
import { $ as success$ } from './app/success';
import { $ as properties } from './properties/';

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
    render$(action$, state$, { type: 'render' }),
    request$(action$, state$),
    success$(action$, state$)
  )
    .share();
};
