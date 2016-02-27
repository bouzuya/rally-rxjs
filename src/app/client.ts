import { Observable } from 'rxjs';
import { Action } from '../framework/action';
import { Client } from '../framework/client';

import { routes } from './configs/routes';
import { State } from './models/state';
import { Token } from './models/token';
import render from './views/app';

import { create as goTo } from './actions/go-to';
import { create as createRenderAction } from './actions/render';
import {
  from as responseStampRallyShow$
} from './actions/response-stamp-rally-show';
import { from as responseTokenCreate$ } from './actions/response-token-create';
import {
  create as createSuccessSignIn,
  from as successSignInAction$
} from './actions/success-sign-in';
import {
  create as createSuccessStampRallyShow
} from './actions/success-stamp-rally-show';

import makeRequest from './request';
import makeResponse from './requests/all';
import makeState from './properties/all';
import domAction$ from './dom-action';

const app = (
  action$: Observable<Action<any>>,
  options: {
    state: State
  }
): Observable<Action<any>> => {
  const { state } = options;
  const state$ = makeState(action$, state);
  return Observable
    .merge(
      // State to RenderAction
      state$.map(createRenderAction),
      // * to GoToAction
      successSignInAction$(action$)
        .map(() => goTo('/stamp_rallies')),
      // * to RequestAction
      makeRequest(action$, state$),
      // RequestAction to ResponseAction
      makeResponse(action$),
      // * to *
      responseStampRallyShow$(action$)
        .map(createSuccessStampRallyShow),
      responseTokenCreate$(action$)
        .map(createSuccessSignIn)
    )
    .share();
};

export default function main() {
  const client = new Client(
    'div#app', render, app, routes, domAction$
  );
  client.run();
}
