import { Observable } from 'rxjs';
import { Action } from '../framework/action';
import { Client } from '../framework/client';
import { from as route$ } from '../framework/route-action';

import { routes } from './configs/routes';
import { State } from './models/state';
import { Token } from './models/token';
import render from './views/app';

import { from as addSpot$ } from './actions/add-spot';
import { from as addStampRally$ } from './actions/add-stamp-rally';
import goTo from './actions/go-to';
import createRenderAction from './actions/render';
import createRequest from './actions/request';
import { is as isResponseSpotCreate } from './actions/response-spot-create';
import {
  is as isResponseStampRallyShow
} from './actions/response-stamp-rally-show';
import { is as isResponseTokenCreate } from './actions/response-token-create';
import { is as isGoToSignInAction } from './actions/sign-in';
import {
  create as createSuccessSignIn,
  is as isSuccessSignInAction
} from './actions/success-sign-in';
import createSuccessStampRallyShow from './actions/success-stamp-rally-show';

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
      action$
        .filter(isSuccessSignInAction)
        .map(() => goTo('/stamp_rallies')),
      // * to RequestAction
      Observable
        .merge(
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#index')
            .map(() => ({ token, userId }: Token) => {
              return createRequest('stamp-rally-index', { token, userId });
            }),
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#show')
            .map(({ params }) => params['id'])
            .map(stampRallyId => ({ token }: Token) => {
              return createRequest('stamp-rally-show', { token, stampRallyId });
            }),
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#show')
            .map(({ params }) => params['id'])
            .map(stampRallyId => ({ token }: Token) => {
              return createRequest('spot-index', { token, stampRallyId });
            })
        )
        .withLatestFrom(state$, (create: any, state: any) => {
          return create(state.token);
        }),
      addSpot$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            stampRallyId: state.stampRally.name,
            name: state.spotForm.name
          };
        })
        .map(params => createRequest('spot-create', params)),
      addStampRally$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            name: state.stampRallyForm.name
          };
        })
        .map(params => createRequest('stamp-rally-create', params)),
      action$
        .filter(isResponseSpotCreate)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            stampRallyId: state.stampRally.name
          };
        })
        .map(params => createRequest('spot-index', params)),
      action$
        .filter(isGoToSignInAction)
        .withLatestFrom(state$, (_, state) => {
          return {
            email: state.signIn.email,
            password: state.signIn.password,
          };
        })
        .map(params => createRequest('token-create', params)),
      // RequestAction to ResponseAction
      makeResponse(action$),
      // * to *
      action$
        .filter(isResponseStampRallyShow)
        .map(createSuccessStampRallyShow),
      action$
        .filter(isResponseTokenCreate)
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
