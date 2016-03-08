import { A, O } from 'b-o-a';

import { State } from './property-types/state';

import { $ as goTo$ } from './app/go-to';
import { $ as httpResponse$ } from './app/http-response';
import makeOther from './other';
import makeRequest from './request';
import makeResponse from './response';
import makeState from './properties/';

export default function app(
  action$: O<A<any>>,
  options: {
    state: State
  }
): O<A<any>> {
  const { state } = options;
  const defaultState: State = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    currentPage: 'sign_in#index',
    signIn: {
      email: null,
      password: null
    },
    spots: [],
    spotForm: {
      name: null
    },
    stampRallies: [],
    stampRally: null,
    stampRallyForm: {
      name: null
    },
    token: {
      token: null,
      userId: null
    }
  };
  const state$ = makeState(action$, state ? state : defaultState);
  return O
    .merge(
      goTo$(action$),
      httpResponse$(action$),
      makeOther(action$),
      state$.map(state => ({ type: 'render', data: state })),
      makeRequest(action$, state$),
      makeResponse(action$)
    )
    .share();
};
