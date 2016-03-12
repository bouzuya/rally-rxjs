// RenderAction -> render -> render to DOM

import { A, O } from 'b-o-a';
import { DOM } from './dom';

type DOMOptions = {
  root: string;
  render: (state: any, options: any) => any;
  renderActionType?: string;
};

const init = (domOptions: DOMOptions) => {
  const { root, render, renderActionType } = domOptions;
  const type = renderActionType ? renderActionType : 'render';
  const dom = new DOM(root);

  return {
    handler: (action$: O<A<any>>, options: any) => {
      const { re }: { re: (action: A<any>) => void; } = options;
      return action$.map(action => {
        if (action.type !== type) return action;
        const state: any = action.data; // FIXME
        const vtree = render(state, { e: re });
        dom.renderToDOM(vtree);
        return; // return undefined
      });
    }
  };
};

export { init };
