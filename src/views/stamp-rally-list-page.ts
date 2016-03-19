import { State } from '../types/state';
import {
  view as stampRallyFormView
} from '../views/stamp-rally-form';

const view = (state: State, helpers: any) => {
  const { create: h } = helpers;
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
    stampRallyFormView(state.stampRallyForm, helpers)
  ]);
};

export { view };
