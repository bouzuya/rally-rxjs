import { h, VTree } from '../../framework/view';

import { SpotForm } from '../property-types/spot-form';
import { create as addSpot } from '../actions/add-spot';
import {
  create as changeSpotFormName
} from '../actions/change-spot-form-name';

const labeledTextBox = (name: string, value: string, helpers: any): VTree => {
  const { e } = helpers;
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

const view = (state: SpotForm, helpers: any): VTree => {
  const { e } = helpers;
  return h('form.spot', [
    labeledTextBox('name', state.name, helpers),
    h('button.add-spot', {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        e(addSpot());
      }
    }, ['add spot'])
  ]);
};

export { view };
