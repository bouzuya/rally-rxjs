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
import stampRallies$ from './properties/stamp-rallies';
import token$ from './properties/token';
import render from './views/app';

import changeEmailAction from './actions/change-email';
import changePasswordAction from './actions/change-password';
import goToSignInAction from './actions/go-to-sign-in';
import goToStampRallyListAction from './actions/go-to-stamp-rally-list';
import signInAction from './actions/sign-in';
import { is as isSuccessSignInAction } from './actions/success-sign-in';

const domAction$ = (dom: DOM): Observable<Action<any>> => {
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
      changeEmailAction$,
      changePasswordAction$,
      signInAction$
    );
};

const historyAction$ = (history: HistoryRouter): Observable<Action<any>> => {
  const route$ = history.changes();
  const goToStampRallyListAction$ = route$
    .filter(({ name }) => name === 'stamp_rallies#index')
    .map(() => goToStampRallyListAction());
  const goToSignInAction$ = route$
    .filter(({ name }) => name === 'sign_in#index')
    .map(() => goToSignInAction());
  return Observable
    .merge(
      goToSignInAction$,
      goToStampRallyListAction$
    );
};

const app = (
  { state, dom, history }: { state: State, dom: DOM, history: HistoryRouter }
): Observable<State> => {
  const actionSubject = new Subject<Action<any>>();
  const mergedAction$ = Observable
    .merge(
      domAction$(dom),
      historyAction$(history)
    )
    .subscribe((action: Action<any>) => actionSubject.next(action));
  const reaction = (action: Action<any>): void => {
    setTimeout(() => actionSubject.next(action));
  };
  const action$: Observable<Action<any>> = actionSubject.asObservable();
  action$
    .filter(isSuccessSignInAction)
    .subscribe(() => history.go('/stamp_rallies'));
  const state$ = Observable
    .combineLatest(
      currentPage$(state.currentPage, action$),
      signIn$(state.signIn, action$, reaction),
      token$(state.token, action$, reaction),
      stampRallies$(state.stampRallies, action$, reaction),
      (currentPage, signIn, token, stampRallies): State => {
        return { currentPage, signIn, token, stampRallies };
      });
  return state$;
};

export default function main() {
  const client = new Client('div#app', render, app, routes);
  client.run();
}
