import * as htmlescape from 'htmlescape';

import { State } from '../types/state';
import { view as appView } from '../views/app';

const view = (state: State, helpers: any) => {
  const { create: h } = helpers;
  const key = state.googleApiKey;
  const src = 'https://maps.googleapis.com/maps/api/js?key=' + key;
  return h('html', [
    h('head', [
      h('title', ['rally-rxjs']),
      h('link', { rel: 'stylesheet', href: '/styles/index.css' }, []),
      h('script', ['var INITIAL_STATE = ' + htmlescape(state) + ';']),
      h('script', { src }, [])
    ]),
    h('body', [
      appView(state, helpers),
      h('script', { src: '/scripts/bundle.js' }, [])
    ])
  ]);
};

export { view };
