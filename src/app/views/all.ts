import { h, VTree } from '../../framework/view';
import htmlescape from 'htmlescape';

import { State } from '../models/state';
import renderApp from '../views/app';

export default function render(state: State, { e }: any): VTree {
  return h('html', [
    h('head', [
      h('title', ['rally-rxjs']),
      h('link', { rel: 'stylesheet', href: '/styles/index.css' }, []),
      h('script', ['var INITIAL_STATE = ' + htmlescape(state) + ';'])
    ]),
    h('body', [
      renderApp(state, { e }),
      h('script', { src: '/scripts/bundle.js' }, [])
    ])
  ]);
}