import { State } from '../types/state';

import { create as goTo } from '../actions/go-to';

import {
  view as signInPage
} from '../views/sign-in-page';
import {
  view as stampRallyListPage
} from '../views/stamp-rally-list-page';
import {
  view as stampRallyShowPage
} from '../views/stamp-rally-show-page';
import {
  view as notFoundPage
} from '../views/not-found-page';

const pageView = (state: State, helpers: any) => {
  switch (state.currentPage) {
    case 'sign_in#index':
      return signInPage(state, helpers);
    case 'stamp_rallies#index':
      return stampRallyListPage(state, helpers);
    case 'stamp_rallies#show':
      return stampRallyShowPage(state, helpers);
    default:
      return notFoundPage(state, helpers);
  }
};

const view = (state: State, helpers: any) => {
  const { e, create: h } = helpers;
  return h(
    'div#app',
    {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        let node = <any>event.target;
        while (node && node.tagName !== 'A') {
          node = node.parentNode;
        }
        if (!node) return;
        const path: string = node.getAttribute('href');
        e(goTo(path));
      }
    },
    [
      h('h1', ['RALLY (unofficial)']),
      pageView(state, helpers)
    ]);
};

export { view };
