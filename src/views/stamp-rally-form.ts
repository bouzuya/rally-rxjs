import { StampRallyForm } from '../types/stamp-rally-form';
import {
  create as addStampRally
} from '../actions/views/stamp-rally-form/add-stamp-rally';
import {
  create as changeName
} from '../actions/views/stamp-rally-form/change-name';

const labeledTextBox = (name: string, value: string, helpers: any) => {
  const { create: h, e } = helpers;
  return h('label', [
    name,
    h('input.' + name, {
      type: 'text',
      name,
      value,
      onchange: ({ target: { value } }) => {
        e(changeName(value))
      }
    }, []),
  ]);
};

const view = (state: StampRallyForm, helpers: any) => {
  const { create: h, e } = helpers;
  return h('form.stamp-rally', [
    labeledTextBox('name', state.name, helpers),
    h('button.add-stamp-rally', {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        e(addStampRally());
      }
    }, ['add stamp-rally'])
  ]);
};

export { view };
