import { diff, patch, VTree, RTree } from '../../framework/view';
import * as parse from 'vdom-parser';

class DOM {
  private rtree: RTree;
  private vtree: VTree;

  constructor(rootSelector: string) {
    this.rtree = document.querySelector(rootSelector);
    this.vtree = parse(this.rtree);
  }

  renderToDOM(vtree: VTree): void {
    const current = this.vtree;
    const next = vtree;
    this.rtree = patch(this.rtree, diff(current, next));
    this.vtree = next;
  }
}

export { DOM };
