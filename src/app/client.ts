import { Observable, Subject } from 'rxjs';
import { Client } from '../framework/client';
import { DOM } from '../framework/dom';
import { VTree } from '../framework/view';
import { HistoryRouter } from '../framework/history-router';

import { routes } from './configs/routes';
import { Action } from './models/action';
import { State } from './models/state';
import currentPage$ from './properties/current-page';
import signIn$ from './properties/sign-in';
import spots$ from './properties/spots';
import spotForm$ from './properties/spot-form';
import stampRallies$ from './properties/stamp-rallies';
import stampRally$ from './properties/stamp-rally';
import stampRallyForm$ from './properties/stamp-rally-form';
import token$ from './properties/token';
import render from './views/app';

import {
  is as isAddSpotAction,
  create as addSpotAction
} from './actions/add-spot';
import {
  is as isAddStampRallyAction,
  create as addStampRallyAction
} from './actions/add-stamp-rally';
import changeEmailAction from './actions/change-email';
import changePasswordAction from './actions/change-password';
import changeSpotFormNameAction from './actions/change-spot-form-name';
import
  changeStampRallyFormNameAction
from './actions/change-stamp-rally-form-name';
import goToSignInAction from './actions/go-to-sign-in';
import goToStampRallyListAction from './actions/go-to-stamp-rally-list';
import goToStampRallyShowAction from './actions/go-to-stamp-rally-show';
import { create as createRequest } from './actions/request';
import { is as isResponseSpotCreate } from './actions/response-spot-create';
import signInAction from './actions/sign-in';
import { is as isSuccessSignInAction } from './actions/success-sign-in';
import { is as isGoToAction, create as goTo } from './actions/go-to';

import request from './requests/all';

// TODO: move to views/
const domAction$ = (dom: DOM): Observable<Action<any>> => {
  const changeAction$ = (
    selector: string, create: (value: string) => Action<{ value: string }>
  ) => {
    return dom
      .on(selector, 'change')
      .map(({ target }) => {
        const value = (<any> target).value;
        return create(value);
      });
  };
  const addSpotAction$ = dom
    .on('form.spot button.add-spot', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      return addSpotAction();
    });
  const addStampRallyAction$ = dom
    .on('form.stamp-rally button.add-stamp-rally', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      return addStampRallyAction();
    });
  const clickAnchorAction$ = dom
    .on('a', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      const path: string = (<any> event.target).getAttribute('href');
      return goTo(path);
    });
  const changeEmailAction$ = changeAction$(
    'input.email', changeEmailAction
  );
  const changePasswordAction$ = changeAction$(
    'input.password', changePasswordAction
  );
  const changeSpotFormNameAction$ = changeAction$(
    'form.spot input.name', changeSpotFormNameAction
  );
  const changeStampRallyFormNameAction$ = changeAction$(
    'form.stamp-rally input.name', changeStampRallyFormNameAction
  );
  const signInAction$ = dom
    .on('button.sign-in', 'click')
    .map(() => signInAction());
  return Observable
    .merge(
      addSpotAction$,
      addStampRallyAction$,
      clickAnchorAction$,
      changeEmailAction$,
      changePasswordAction$,
      changeSpotFormNameAction$,
      changeStampRallyFormNameAction$,
      signInAction$
    );
};

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
  { dom, history }: { dom: DOM, history: HistoryRouter }
): {
  observable: Observable<Action<any>>;
  next: (action: Action<any>) => void;
} => {
  const actionSubject = new Subject<Action<any>>();
  const mergedAction$ = Observable
    .merge(
      domAction$(dom),
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
  options: { state: State, dom: DOM, history: HistoryRouter }
): Observable<State> => {
  const { state, history } = options;
  const { observable: action$, next } = makeActionSubject(options);
  request(action$, next);
  const state$ = Observable
    .combineLatest(
      currentPage$(state.currentPage, action$),
      signIn$(state.signIn, action$, next),
      token$(state.token, action$, next),
      spots$(state.spots, action$, next),
      spotForm$(state.spotForm, action$, next),
      stampRallies$(state.stampRallies, action$, next),
      stampRally$(state.stampRally, action$, next),
      stampRallyForm$(state.stampRallyForm, action$, next),
      (
        currentPage,
        signIn,
        token,
        spots,
        spotForm,
        stampRallies,
        stampRally,
        stampRallyForm
      ): State => {
        return {
          currentPage,
          signIn,
          token,
          spots,
          spotForm,
          stampRallies,
          stampRally,
          stampRallyForm
        };
      })
    .do(console.log.bind(console))
    .share();
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
  return state$;
};

export default function main() {
  const client = new Client('div#app', render, app, routes);
  client.run();
}
