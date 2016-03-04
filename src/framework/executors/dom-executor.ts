import { Subject } from 'rxjs';
import { A } from '../o-a';
import { Executor } from '../executor';
import { VTree } from '../view';
import { DOM } from '../dom';
import { is as isRender } from '../../app/actions/render';

export default function init(
  viewRootSelector: string,
  view: (state: any, options: any) => VTree
): Executor {
  const after = (context: any): any => context;

  const before = (context: any): any => {
    const dom = new DOM(viewRootSelector);
    return Object.assign({}, context, { dom });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isRender(action)) return action;
    const { dom, re }: { dom: DOM; re: (action: A<any>) => void; } = context;
    const state: any = action.data; // FIXME
    const vtree = view(state, { e: re });
    dom.renderToDOM(vtree);
    return { type: 'noop' };
  };

  return { after, before, execute };
}
