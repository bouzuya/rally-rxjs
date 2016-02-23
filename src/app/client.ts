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
import stampRallies$ from './properties/stamp-rallies';
import stampRally$ from './properties/stamp-rally';
import token$ from './properties/token';
import render from './views/app';

import changeEmailAction from './actions/change-email';
import changePasswordAction from './actions/change-password';
import goToSignInAction from './actions/go-to-sign-in';
import goToStampRallyListAction from './actions/go-to-stamp-rally-list';
import goToStampRallyShowAction from './actions/go-to-stamp-rally-show';
import signInAction from './actions/sign-in';
import { is as isSuccessSignInAction } from './actions/success-sign-in';
import { is as isGoToAction, create as goTo } from './actions/go-to';

// TODO: move to views/
const domAction$ = (dom: DOM): Observable<Action<any>> => {
  const clickAnchorAction$ = dom
    .on('a', 'click')
    .map((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      const path: string = (<any> event.target).getAttribute('href');
      return goTo(path);
    });
  const changeEmailAction$ = dom
    .on('input.email', 'change')
    .map(({ target }) => {
      const value = (<any> target).value;
      return changeEmailAction(value);
    });
  const changePasswordAction$ = dom
    .on('input.password', 'change')
    .map(({ target }) => {
      const value = (<any> target).value;
      return changePasswordAction(value);
    });
  const signInAction$ = dom
    .on('button', 'click')
    .map(() => signInAction());
  return Observable
    .merge(
      clickAnchorAction$,
      changeEmailAction$,
      changePasswordAction$,
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
  const goTo$: Observable<Action<string>> = Observable
    .merge(
      action$
        .filter(isSuccessSignInAction)
        .map(() => goTo('/stamp_rallies')),
      action$
        .filter(isGoToAction)
    );
  const state$ = Observable
    .combineLatest(
      currentPage$(state.currentPage, action$),
      signIn$(state.signIn, action$, next),
      token$(state.token, action$, next),
      spots$(state.spots, action$, next),
      stampRallies$(state.stampRallies, action$, next),
      stampRally$(state.stampRally, action$, next),
      (currentPage, signIn, token, spots, stampRallies, stampRally): State => {
        return { currentPage, signIn, token, spots, stampRallies, stampRally };
      });
  goTo$
    .subscribe(({ params: path }) => history.go(path));
  return state$;
};

export default function main() {
  const client = new Client('div#app', render, app, routes);
  client.run();
}
