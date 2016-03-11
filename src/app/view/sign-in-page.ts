import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';
import {
  create as changeEmail
} from '../actions/change-sign-in-form-email';
import {
  create as changePassword
} from '../actions/change-sign-in-form-password';
import { create as signIn } from '../actions/sign-in';

const view = (state: State, helpers: any): VTree => {
  const { e } = helpers;
  return h('div.sign-in-page', [
    h('label', [
      'email',
      h('input.email', {
        type: 'email',
        name: 'email',
        value: state.signIn.email,
        onchange: ({ target: { value } }) => e(changeEmail(value))
      }, []),
    ]),
    h('label', [
      'password',
      h('input.password', {
        type: 'password',
        name: 'password',
        value: state.signIn.password,
        onchange: ({ target: { value } }) => e(changePassword(value))
      }, [])
    ]),
    h('button.sign-in', {
      onclick: () => e(signIn())
    }, ['sign in'])
  ]);
};

export { view };
