import { h, VTree } from '../../framework/view';

import { StampRallyForm } from '../property-type/stamp-rally-form';
import { create as addStampRally } from '../action/view/add-stamp-rally';
import {
  create as changeStampRallyFormName
} from '../action/view/change-stamp-rally-form-name';

const labeledTextBox = (name: string, value: string, helpers: any): VTree => {
  const { e } = helpers;
  return h('label', [
    name,
    h('input.' + name, {
      type: 'text',
      name,
      value,
      onchange: ({ target: { value } }) => {
        e(changeStampRallyFormName(value))
      }
    }, []),
  ]);
};

const view = (state: StampRallyForm, helpers: any): VTree => {
  const { e } = helpers;
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
