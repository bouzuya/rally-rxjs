import { Observable, Subject } from 'rxjs';
import { Action } from '../framework/action';
import { Client } from '../framework/client';
import { RouteAction } from '../framework/router';

import { routes } from './configs/routes';
import { State } from './models/state';
import { Token } from './models/token';
import render from './views/app';

import { is as isAddSpotAction } from './actions/add-spot';
import { is as isAddStampRallyAction } from './actions/add-stamp-rally';
import { is as isGoToAction, create as goTo } from './actions/go-to';
import goToSignInAction from './actions/go-to-sign-in';
import {
  create as goToStampRallyListAction,
  is as isGoToStampRallyList
} from './actions/go-to-stamp-rally-list';
import {
  create as goToStampRallyShowAction,
  is as isGoToStampRallyShow
} from './actions/go-to-stamp-rally-show';
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
      // RouteAction to *
      action$
        .filter(({ type }) => type === 'route')
        .filter(({ params: { name } }) => name === 'sign_in#index')
        .map(() => goToSignInAction()),
      action$
        .filter(({ type }) => type === 'route')
        .filter(({ params: { name } }) => name === 'stamp_rallies#index')
        .map(() => goToStampRallyListAction()),
      action$
        .filter(({ type }) => type === 'route')
        .filter(({ params: { name } }) => name === 'stamp_rallies#show')
        .map(({ params }) => goToStampRallyShowAction(params['id'])),
      action$
        .filter(isGoToAction),
      // * to RequestAction
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
