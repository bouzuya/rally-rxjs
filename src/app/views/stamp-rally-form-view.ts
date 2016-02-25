import { h, VTree } from '../../framework/view';

import { StampRallyForm } from '../models/stamp-rally-form';

const labeledTextBox = (name: string, value: string): VTree => {
  return h('label', [
    name,
    h('input.' + name, {
      type: 'text',
      name,
      value
    }, []),
  ]);
};

export default function render(state: StampRallyForm): VTree {
  return h('form.stamp-rally', [
    labeledTextBox('name', state.name),
    h('button.add-stamp-rally', ['add stamp-rally'])
  ]);
};
