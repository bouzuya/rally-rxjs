import { A } from 'b-o-a';
import { Executor } from '../../framework/executor';
import { DOM } from './dom';
import { is as isRender } from './render-action';

const init = (options: any): Executor => {
  const { root, render }: {
    root: string;
    render: (state: any, options: any) => any;
  } = options;
  const after = (context: any): any => context;

  const before = (context: any): any => {
    const dom = new DOM(root);
    return Object.assign({}, context, { dom });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isRender(action)) return action;
    const { dom, re }: { dom: DOM; re: (action: A<any>) => void; } = context;
    const state: any = action.data; // FIXME
    const vtree = render(state, { e: re });
    dom.renderToDOM(vtree);
    return { type: 'noop' };
  };

  return { after, before, execute };
}

export { init };
