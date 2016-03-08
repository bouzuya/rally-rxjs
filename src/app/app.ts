import { A, O } from 'b-o-a';

import { State } from './property-types/state';

import { $ as goTo$ } from './app/go-to';
import { $ as httpResponse$ } from './app/http-response';
import { $ as request$ } from './app/request';
import { $ as response$ } from './app/response';
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
  return O
    .merge(
      goTo$(action$, state$),
      httpResponse$(action$, state$),
      request$(action$, state$),
      response$(action$, state$),
      success$(action$, state$),
      state$.map(state => ({ type: 'render', data: state }))
    )
    .share();
};
