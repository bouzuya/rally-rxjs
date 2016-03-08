import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';
import renderStampRallyFormView from '../views/stamp-rally-form-view';

export default function render(state: State, helpers: any): VTree {
  return h('div.stamp-rally-list-page', [
    h('ul', state.stampRallies.map(stampRally => {
      const href = '/stamp_rallies/' + stampRally.name;
      const src = stampRally.image ? stampRally.image.s64 : null;
      return h('li', [
        h('a.stamp-rally', { href }, [
          h('span.image', src ? [h('img', { src }, [])] : []),
          h('span.id', [stampRally.name]),
          h('span.name', [stampRally.displayName]),
        ])
      ]);
    })),
    renderStampRallyFormView(state.stampRallyForm, helpers)
  ]);
}
