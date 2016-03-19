import { State } from '../types/state';
import {
  create as changeEmail
} from '../actions/views/sign-in-page/change-email';
import {
  create as changePassword
} from '../actions/views/sign-in-page/change-password';
import {
  create as signIn
} from '../actions/views/sign-in-page/sign-in';

const view = (state: State, helpers: any) => {
  const { create: h, e } = helpers;
  return h('div.sign-in-page', [
    h('form.sign-in-form', [
      h('label.control.email', [
        h('span.label', ['email']),
        h('input.value', {
          type: 'email',
          name: 'email',
          value: state.signIn.email,
          onchange: ({ target: { value } }) => e(changeEmail(value))
        }, []),
      ]),
      h('label.control.password', [
        h('span.label', ['password']),
        h('input.value', {
          type: 'password',
          name: 'password',
          value: state.signIn.password,
          onchange: ({ target: { value } }) => e(changePassword(value))
        }, [])
      ]),
      h('button.sign-in-button', {
        onclick: () => e(signIn())
      }, ['sign in'])
    ])
  ]);
};

export { view };
