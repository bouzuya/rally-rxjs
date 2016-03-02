import { h, VTree } from '../../framework/view';

import { StampRallyForm } from '../models/stamp-rally-form';
import { create as addStampRallyAction } from '../actions/add-stamp-rally';
import {
  create as changeStampRallyFormName
} from '../actions/change-stamp-rally-form-name';

const labeledTextBox = (name: string, value: string, e: any): VTree => {
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

export default function render(state: StampRallyForm, { e }: any): VTree {
  return h('form.stamp-rally', [
    labeledTextBox('name', state.name, e),
    h('button.add-stamp-rally', {
      onclick: (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        e(addStampRallyAction());
      }
    }, ['add stamp-rally'])
  ]);
};
