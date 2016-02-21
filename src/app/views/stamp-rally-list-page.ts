import { h, VTree } from '../../framework/view';

import { State } from '../models/state';

export default function render(state: State): VTree {
  return h('div.stamp-rally-list-page', [
    h('ul', state.stampRallies.map(stampRally => {
      return h('li', [stampRally.name]);
    }))
  ]);
}
