import { h, VTree } from '../../framework/view';

import { State } from '../models/state';

export default function render(state: State): VTree {
  return h('div.sign-in-page', [
    h('label', [
      'email',
      h('input.email', {
        type: 'email',
        name: 'email',
        value: state.signIn.email
      }, []),
    ]),
    h('label', [
      'password',
      h('input.password', {
        type: 'password',
        name: 'password',
        value: state.signIn.password
      }, [])
    ]),
    h('button', ['sign in'])
  ]);
}
