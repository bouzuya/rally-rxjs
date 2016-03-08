import { h, VTree } from '../../framework/view';

import { State } from '../property-types/state';

export default function render(): VTree {
  return h('div.not-found', ['page not found']);
}
