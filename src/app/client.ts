import { Observable, Subject } from 'rxjs';
import { Client } from '../framework/client';
import { VTree } from '../framework/view';
import { HistoryRouter } from '../framework/history-router';

import { routes } from './configs/routes';
import { Action } from './models/action';
import { State } from './models/state';
import render from './views/app';

import { is as isAddSpotAction } from './actions/add-spot';
import { is as isAddStampRallyAction } from './actions/add-stamp-rally';
import changeEmailAction from './actions/change-email';
import changePasswordAction from './actions/change-password';
import changeSpotFormNameAction from './actions/change-spot-form-name';
import
  changeStampRallyFormNameAction
from './actions/change-stamp-rally-form-name';
import goToSignInAction from './actions/go-to-sign-in';
import goToStampRallyListAction from './actions/go-to-stamp-rally-list';
import goToStampRallyShowAction from './actions/go-to-stamp-rally-show';
import createRenderAction from './actions/render';
import { create as createRequest } from './actions/request';
import { is as isResponseSpotCreate } from './actions/response-spot-create';
import signInAction from './actions/sign-in';
import { is as isSuccessSignInAction } from './actions/success-sign-in';
import { is as isGoToAction, create as goTo } from './actions/go-to';

import makeState from './properties/all';
import request from './requests/all';
import domAction$ from './dom-action';

const historyAction$ = (history: HistoryRouter): Observable<Action<any>> => {
  const route$ = history.changes();
  const goToSignInAction$ = route$
    .filter(({ name }) => name === 'sign_in#index')
    .map(() => goToSignInAction());
  const goToStampRallyListAction$ = route$
    .filter(({ name }) => name === 'stamp_rallies#index')
    .map(() => goToStampRallyListAction());
  const goToStampRallyShowAction$ = route$
    .filter(({ name }) => name === 'stamp_rallies#show')
    .map(({ params }) => goToStampRallyShowAction(params['id']));
  return Observable
    .merge(
      goToSignInAction$,
      goToStampRallyListAction$,
      goToStampRallyShowAction$
    );
};

// TODO: remove `next`
const makeActionSubject = (
  {
    domAction$, history
  }: {
    domAction$: Observable<Action<any>>;
    history: HistoryRouter;
  }
): {
  observable: Observable<Action<any>>;
  next: (action: Action<any>) => void;
} => {
  const actionSubject = new Subject<Action<any>>();
  const mergedAction$ = Observable
    .merge(
      domAction$,
      historyAction$(history)
    )
    .subscribe((action: Action<any>) => actionSubject.next(action));
  const observable = actionSubject.asObservable();
  const next = (action: Action<any>): void => {
    setTimeout(() => actionSubject.next(action));
  };
  return { observable, next };
};

const app = (
  options: {
    state: State,
    domAction$: Observable<Action<any>>,
    history: HistoryRouter
  }
): Observable<Action<State>> => {
  const { state, history } = options;
  const { observable: action$, next } = makeActionSubject(options);
  request(action$, next);
  const state$ = makeState(state, action$, next)
    .do(console.log.bind(console));
  Observable
    .merge(
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
        .map(params => createRequest('spot-index', params))
    )
    .subscribe(next);
  Observable
    .merge(
      action$
        .filter(isSuccessSignInAction)
        .map(() => goTo('/stamp_rallies')),
      action$
        .filter(isGoToAction)
    )
    .subscribe(({ params: path }: Action<string>) => history.go(path));
  return state$.map(createRenderAction);
};

export default function main() {
  const client = new Client('div#app', render, app, routes, domAction$);
  client.run();
}
