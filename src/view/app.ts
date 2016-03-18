import { create as h } from 'boajs-vdom';

import { State } from '../types/state';

import { create as goTo } from '../actions/go-to';

import {
  view as signInPage
} from '../view/sign-in-page';
import {
  view as stampRallyListPage
} from '../view/stamp-rally-list-page';
import {
  view as stampRallyShowPage
} from '../view/stamp-rally-show-page';
import {
  view as notFoundPage
} from '../view/not-found-page';

const pageView = (state: State, helpers: any) => {
  switch (state.currentPage) {
    case 'sign_in#index':
      return signInPage(state, helpers);
    case 'stamp_rallies#index':
      return stampRallyListPage(state, helpers);
    case 'stamp_rallies#show':
      return stampRallyShowPage(state, helpers);
    default:
      return notFoundPage();
  }
};

const view = (state: State, helpers: any) => {
  const { e } = helpers;
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
