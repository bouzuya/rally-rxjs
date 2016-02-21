import { h, VTree } from '../../framework/view';
import htmlescape from 'htmlescape';

import { State } from '../models/state';
import renderApp from '../views/app';

export default function render(state: State): VTree {
  return h('html', [
    h('head', [
      h('title', ['rally-rxjs']),
      h('script', ['var INITIAL_STATE = ' + htmlescape(state) + ';'])
    ]),
    h('body', [
      renderApp(state),
      h('script', { src: '/scripts/bundle.js' }, [])
    ])
  ]);
}