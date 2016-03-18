import { State } from '../types/state';
import {
  create as changeEmail
} from '../actions/views/change-sign-in-form-email';
import {
  create as changePassword
} from '../actions/views/change-sign-in-form-password';
import {
  create as signIn
} from '../actions/views/sign-in';

const view = (state: State, helpers: any) => {
  const { create: h, e } = helpers;
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
