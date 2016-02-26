import { Observable, Subject } from 'rxjs';
import { Client } from '../framework/client';

import { routes } from './configs/routes';
import { Action } from './models/action';
import { State } from './models/state';
import { Token } from './models/token';
import render from './views/app';

import { is as isAddSpotAction } from './actions/add-spot';
import { is as isAddStampRallyAction } from './actions/add-stamp-rally';
import { is as isGoToAction, create as goTo } from './actions/go-to';
import { is as isGoToStampRallyList } from './actions/go-to-stamp-rally-list';
import { is as isGoToStampRallyShow } from './actions/go-to-stamp-rally-show';
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

import makeRequest from './requests/all';
import makeState from './properties/all';
import domAction$ from './dom-action';
import historyAction$ from './history-action';

const app = (
  action$: Observable<Action<any>>,
  options: {
    state: State
  }
): Observable<Action<any>> => {
  const { state } = options;
  const state$ = makeState(state, action$)
    .do(console.log.bind(console));
  return Observable
    .merge(
      // RenderAction
      state$.map(createRenderAction),
      // GoToAction
      action$
        .filter(isSuccessSignInAction)
        .map(() => goTo('/stamp_rallies')),
      action$
        .filter(isGoToAction),
      // RequestAction
      makeRequest(action$),
      // *Action
      action$
        .filter(isResponseStampRallyShow)
        .map(createSuccessStampRallyShow),
      action$
        .filter(isResponseTokenCreate)
        .map(createSuccessSignIn),
      Observable
        .merge(
          action$
            .filter(isGoToStampRallyList)
            .map(() => ({ token, userId }: Token) => {
              return createRequest('stamp-rally-index', { token, userId });
            }),
          action$
            .filter(isGoToStampRallyShow)
            .map(({ params: stampRallyId }) => ({ token }: Token) => {
              return createRequest('stamp-rally-show', { token, stampRallyId });
            }),
          action$
            .filter(isGoToStampRallyShow)
            .map(({ params: stampRallyId }) => ({ token }: Token) => {
              return createRequest('spot-index', { token, stampRallyId });
            })
        )
        .withLatestFrom(state$, (create: any, state: any) => {
          return create(state.token);
        }),
      action$
        .filter(isAddSpotAction)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            stampRallyId: state.stampRally.name,
            name: state.spotForm.name
          };
        })
        .map(params => createRequest('spot-create', params)),
      action$
        .filter(isAddStampRallyAction)
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
        .map(params => createRequest('token-create', params))
    );
};

export default function main() {
  const client = new Client(
    'div#app', render, app, routes, domAction$, historyAction$
  );
  client.run();
}
