import { h, VTree } from '../../framework/view';

import { SpotForm } from '../models/spot-form';

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

export default function render(state: SpotForm): VTree {
  return h('form.spot', [
    labeledTextBox('name', state.name),
    h('button.add-spot', ['add spot'])
  ]);
};
