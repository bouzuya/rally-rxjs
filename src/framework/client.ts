import { Observable } from 'rxjs';
import { DOM } from './dom';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';

class Client<State> {
  private rootSelector: string;
  private render: (state: State) => VTree;
  private app: (x: any) => Observable<{ type: string; params: State; }>;
  private router: Router;
  private domAction: (dom: DOM) => Observable<{ type: string; }>;

  constructor(
    rootSelector: string,
    render: (state: State) => VTree,
    app: (x: any) => Observable<{ type: string; params: State; }>,
    routes: Route[],
    domAction: (dom: DOM) => Observable<{ type: string; }>
  ) {
    this.rootSelector = rootSelector;
    this.render = render;
    this.app = app;
    this.router = new Router(routes);
    this.domAction = domAction;
  }

  run(): void {
    const dom = new DOM(this.rootSelector);
    const domAction$ = this.domAction(dom);
    const history = new HistoryRouter(this.router);
    const state: State = (<any> window).INITIAL_STATE;
    const render$ = this.app({ state, domAction$, history });
    history.start();
    render$
      .map(({ params: state }) => this.render(state))
      .subscribe(vtree => dom.renderToDOM(vtree));
  }
}

export { Client };
