import { h, VTree } from '../../framework/view';

const view = (): VTree => {
  return h('div.not-found', ['page not found']);
};

export { view };
