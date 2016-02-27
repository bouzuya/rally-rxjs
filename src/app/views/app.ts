import { h, VTree } from '../../framework/view';

import { State } from '../models/state';

import renderSignInPage from '../views/sign-in-page';
import renderStampRallyListPage from '../views/stamp-rally-list-page';
import renderStampRallyShowPage from '../views/stamp-rally-show-page';
import renderNotFoundPage from '../views/not-found-page';

const renderPage = (state: State): VTree => {
  switch (state.currentPage) {
    case 'sign_in#index':
      return renderSignInPage(state);
    case 'stamp_rallies#index':
      return renderStampRallyListPage(state);
    case 'stamp_rallies#show':
      return renderStampRallyShowPage(state);
    default:
      return renderNotFoundPage();
  }
};

export default function render(state: State): VTree {
  return h('div#app', [
    h('h1', ['RALLY (unofficial)']),
    renderPage(state)
  ]);
}
