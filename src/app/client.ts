import { Observable, Subject } from 'rxjs';
import { Client } from '../framework/client';

import { routes } from './configs/routes';
import { Action } from './models/action';
import { State } from './models/state';
import { Token } from './models/token';
import render from './views/app';

import { is as isAddSpotAction } from './actions/add-spot';
import { is as isAddStampRallyAction } from './actions/add-stamp-rally';
import createRenderAction from './actions/render';
import createRequest from './actions/request';
import { is as isResponseSpotCreate } from './actions/response-spot-create';
import { is as isSuccessSignInAction } from './actions/success-sign-in';
import { is as isGoToAction, create as goTo } from './actions/go-to';
import { is as isGoToSignInAction } from './actions/sign-in';
import { is as isGoToStampRallyList } from './actions/go-to-stamp-rally-list';
import { is as isGoToStampRallyShow } from './actions/go-to-stamp-rally-show';
import { is as isResponseTokenCreate } from './actions/response-token-create';
import createSuccessSignIn from './actions/success-sign-in';
import {
  is as isResponseStampRallyShow
} from './actions/response-stamp-rally-show';
import createSuccessStampRallyShow from './actions/success-stamp-rally-show';

import makeState from './properties/all';
import request from './requests/all';
import domAction$ from './dom-action';
import historyAction$ from './history-action';

// TODO: remove `next`
const makeActionSubject = (action$: Observable<Action<any>>): {
  observable: Observable<Action<any>>;
  next: (action: Action<any>) => void;
} => {
  const actionSubject = new Subject<Action<any>>();
  action$.subscribe((action: Action<any>) => actionSubject.next(action));
  const observable = actionSubject.asObservable();
  const next = (action: Action<any>): void => {
    setTimeout(() => actionSubject.next(action));
  };
  return { observable, next };
};

const app = (
  source$: Observable<Action<any>>,
  options: {
    state: State
  }
): Observable<Action<any>> => {
  const { state } = options;
  const { observable: action$, next } = makeActionSubject(source$);
  request(action$, next);
  const state$ = makeState(state, action$)
    .do(console.log.bind(console));
  Observable
    .merge(
      action$
        .filter(isResponseStampRallyShow)
        .map(createSuccessStampRallyShow),
      action$
        .filter(isResponseTokenCreate)
        .map(() => createSuccessSignIn()),
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
    )
    .subscribe(next);
  return Observable
    .merge(
      state$.map(createRenderAction),
      Observable
        .merge(
          action$
            .filter(isSuccessSignInAction)
            .map(() => goTo('/stamp_rallies')),
          action$
            .filter(isGoToAction)
        )
    );
};

export default function main() {
  const client = new Client(
    'div#app', render, app, routes, domAction$, historyAction$
  );
  client.run();
}
