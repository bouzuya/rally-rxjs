import { h, VTree } from '../../framework/view';

import { State } from '../models/state';

import { create as goTo } from '../actions/go-to';

import renderSignInPage from '../views/sign-in-page';
import renderStampRallyListPage from '../views/stamp-rally-list-page';
import renderStampRallyShowPage from '../views/stamp-rally-show-page';
import renderNotFoundPage from '../views/not-found-page';

const renderPage = (state: State, { e }: any): VTree => {
  switch (state.currentPage) {
    case 'sign_in#index':
      return renderSignInPage(state, { e });
    case 'stamp_rallies#index':
      return renderStampRallyListPage(state, { e });
    case 'stamp_rallies#show':
      return renderStampRallyShowPage(state, { e });
    default:
      return renderNotFoundPage();
  }
};

export default function render(state: State, { e }: any): VTree {
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
    renderPage(state, { e })
  ]);
}
