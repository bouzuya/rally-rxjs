import { h, VTree } from '../../framework/view';

import { State } from '../models/state';
import renderStampRallyFormView from '../views/stamp-rally-form-view';

export default function render(state: State): VTree {
  return h('div.stamp-rally-list-page', [
    h('ul', state.stampRallies.map(stampRally => {
      const href = '/stamp_rallies/' + stampRally.name;
      return h('li', [
        h('a', { href }, [stampRally.name])
      ]);
    })),
    renderStampRallyFormView(state.stampRallyForm)
  ]);
}
