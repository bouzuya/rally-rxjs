import { Subject } from 'rxjs';
import { A } from './o-a';
import { VTree } from './view';
import { DOM } from './dom';
import { is as isRender } from '../app/actions/render';

class DOMExecutor<State> {
  private dom: DOM;
  private subject: Subject<A<any>>;
  private view: (state: State, options: any) => VTree;

  constructor(
    rootSelector: string,
    view: (state: State, options: any) => VTree,
    subject: Subject<A<any>>
  ) {
    this.dom = new DOM(rootSelector);
    this.subject = subject;
    this.view = view;
  }

  execute(action: A<any>): A<any> {
    if (!isRender(action)) return action;
    const state: any = action.params; // FIXME
    const e = (action: A<any>): void => this.subject.next(action);
    const vtree = this.view(state, { e });
    this.dom.renderToDOM(vtree);
    return { type: 'noop' };
  }
}

export { DOMExecutor };