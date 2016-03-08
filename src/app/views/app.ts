import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';

import {
  create as goTo
} from '../../executors/history/go-to-action';

import renderSignInPage from '../views/sign-in-page';
import renderStampRallyListPage from '../views/stamp-rally-list-page';
import renderStampRallyShowPage from '../views/stamp-rally-show-page';
import renderNotFoundPage from '../views/not-found-page';

const renderPage = (state: State, helpers: any): VTree => {
  switch (state.currentPage) {
    case 'sign_in#index':
      return renderSignInPage(state, helpers);
    case 'stamp_rallies#index':
      return renderStampRallyListPage(state, helpers);
    case 'stamp_rallies#show':
      return renderStampRallyShowPage(state, helpers);
    default:
      return renderNotFoundPage();
  }
};

export default function render(state: State, helpers: any): VTree {
  const { e } = helpers;
  return h('div#app', {
    onclick: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      let node = <any> event.target;
      while (node && node.tagName !== 'A') {
        node = node.parentNode;
      }
      if (!node) return;
      const path: string = node.getAttribute('href');
      e(goTo(path));
    }
  }, [
    h('h1', ['RALLY (unofficial)']),
    renderPage(state, helpers)
  ]);
}
