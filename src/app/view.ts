import { h, VTree } from '../framework/view';
import htmlescape from 'htmlescape';

import { State } from './models/state';

const renderSignInPage = (state: State): VTree => {
  return h('div.sign-in-page', [
    h('label', [
      'email',
      h('input.email', {
        type: 'email',
        name: 'email',
        value: state.signIn.email
      }, []),
    ]),
    h('label', [
      'password',
      h('input.password', {
        type: 'password',
        name: 'password',
        value: state.signIn.password
      }, [])
    ]),
    h('button', ['sign in'])
  ]);
};

const renderStampRallyListPage = (state: State): VTree => {
  return h('div.stamp-rally-list-page', [
    h('ul', state.stampRallies.map(stampRally => {
      return h('li', [stampRally.name]);
    }))
  ]);
};

const renderNotFound = (): VTree => {
  return h('div.not-found', ['page not found']);
};

const renderPage = (state: State): VTree => {
  switch (state.currentPage) {
    case 'sign-in':
      return renderSignInPage(state);
    case 'stamp-rally-list':
      return renderStampRallyListPage(state);
    default:
      return renderNotFound();
  }
};

const renderApp = (state: State) => {
  return h('div#app', [
    h('h1', ['RALLY (unofficial)']),
    renderPage(state)
  ]);
};

const view = (state: State, all: boolean = false): VTree => {
  const app = renderApp(state);
  if (!all) return app;
  return h('html', [
    h('head', [
      h('title', ['rally-rxjs']),
      h('script', ['var INITIAL_STATE = ' + htmlescape(state) + ';'])
    ]),
    h('body', [
      app,
      h('script', { src: '/scripts/bundle.js' }, [])
    ])
  ]);
};

export { view };