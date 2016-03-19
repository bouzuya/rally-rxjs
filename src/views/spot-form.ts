import { SpotForm } from '../types/spot-form';
import {
  create as addSpot
} from '../actions/views/add-spot';
import {
  create as changeSpotFormName
} from '../actions/views/change-spot-form-name';

const labeledTextBox = (name: string, value: string, helpers: any) => {
  const { create: h, e } = helpers;
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

const view = (state: SpotForm, helpers: any) => {
  const { create: h, e } = helpers;
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
