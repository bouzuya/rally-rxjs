import { h, VTree } from '../../framework/view';
import htmlescape from 'htmlescape';

import { State } from '../models/state';
import renderApp from '../views/app';

export default function render(state: State, helpers: any): VTree {
  return h('html', [
    h('head', [
      h('title', ['rally-rxjs']),
      h('link', { rel: 'stylesheet', href: '/styles/index.css' }, []),
      h('script', ['var INITIAL_STATE = ' + htmlescape(state) + ';']),
      h('script', {
        src: 'https://maps.googleapis.com/maps/api/js?key=' + state.googleApiKey
      }, [])
    ]),
    h('body', [
      renderApp(state, helpers),
      h('script', { src: '/scripts/bundle.js' }, [])
    ])
  ]);
}