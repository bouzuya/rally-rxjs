import { Observable } from 'rxjs';
import { DOM } from './dom';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';
import { is as isGoTo } from '../app/actions/go-to';
import { is as isRender } from '../app/actions/render';

class Client<State> {
  private rootSelector: string;
  private render: (state: State) => VTree;
  private app: (x: any) => Observable<{ type: string; params: any; }>;
  private router: Router;
  private domAction: (dom: DOM) => Observable<{ type: string; }>;
  private historyAction: (history: HistoryRouter) =>
    Observable<{ type: string; }>;

  constructor(
    rootSelector: string,
    render: (state: State) => VTree,
    app: (x: any) => Observable<{ type: string; params: any; }>,
    routes: Route[],
    domAction: (dom: DOM) => Observable<{ type: string; }>,
    historyAction: (history: HistoryRouter) => Observable<{ type: string; }>
  ) {
    this.rootSelector = rootSelector;
    this.render = render;
    this.app = app;
    this.router = new Router(routes);
    this.domAction = domAction;
    this.historyAction = historyAction;
  }

  run(): void {
    const dom = new DOM(this.rootSelector);
    const domAction$ = this.domAction(dom);
    const history = new HistoryRouter(this.router);
    const historyAction$ = this.historyAction(history);
    const state: State = (<any> window).INITIAL_STATE;
    const app$ = this.app({ state, domAction$, historyAction$ });
    history.start();
    app$
      .filter(isGoTo)
      .subscribe(({ params: path }: { params: string; }) => {
        return history.go(path)
      });
    app$
      .filter(isRender)
      .map(({ params: state }) => this.render(state))
      .subscribe(vtree => dom.renderToDOM(vtree));
  }
}

export { Client };
