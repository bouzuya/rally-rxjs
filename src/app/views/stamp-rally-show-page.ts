import { h, VTree } from '../../framework/view';

import { State } from '../models/state';

export default function render(state: State): VTree {
  return h('div.stamp-rally-show-page', [
    state.stampRally
    ? h('h1', [state.stampRally.name])
    : h('h1', ['loading...'])
  ]);
}
