import { h, VTree } from '../../framework/view';

import { SpotForm } from '../models/spot-form';
import { create as addSpot } from '../actions/add-spot';
import {
  create as changeSpotFormName
} from '../actions/change-spot-form-name';

const labeledTextBox = (name: string, value: string, e: any): VTree => {
  return h('label', [
    name,
    h('input.' + name, {
      type: 'text',
      name,
      value,
      onchange: ({ target: { value } }) => e(changeSpotFormName(value))
    }, []),
  ]);
};

export default function render(state: SpotForm, { e }: any): VTree {
  return h('form.spot', [
    labeledTextBox('name', state.name, e),
    h('button.add-spot', {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        e(addSpot());
      }
    }, ['add spot'])
  ]);
};
