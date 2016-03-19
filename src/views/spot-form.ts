import { SpotForm } from '../types/spot-form';
import {
  create as addSpot
} from '../actions/views/spot-form/add-spot';
import {
  create as changeName
} from '../actions/views/spot-form/change-name';

const view = (state: SpotForm, helpers: any) => {
  const { create: h, e } = helpers;
  return h('form.spot-form', [
    h('label.control.name', [
      h('span.label', ['name']),
      h('input.value', {
        type: 'text',
        name: 'name',
        value: state.name,
        onchange: ({ target: { value } }) => e(changeName(value))
      }, []),
    ]),
    h('button.add-spot-button', {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        e(addSpot());
      }
    }, ['add spot'])
  ]);
};

export { view };
