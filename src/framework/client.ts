import { Observable, Subject } from 'rxjs';
import { A, O } from './o-a';
import { DOM } from './dom';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';
import { from as goTo$, is as isGoTo } from '../app/actions/go-to';
import { from as render$, is as isRender } from '../app/actions/render';

class Client<State> {
  private rootSelector: string;
  private render: (state: State) => VTree;
  private app: (
    action$: O<A<any>>,
    options: any
  ) => O<A<any>>;
  private router: Router;
  private domAction: (dom: DOM) => O<A<string>>;

  constructor(
    rootSelector: string,
    render: (state: State) => VTree,
    app: (
      action$: O<A<any>>,
      options: any
    ) => O<A<any>>,
    routes: Route[],
    domAction: (dom: DOM) => O<A<any>>
  ) {
    this.rootSelector = rootSelector;
    this.render = render;
    this.app = app;
    this.router = new Router(routes);
    this.domAction = domAction;
  }

  run(): void {
    const dom = new DOM(this.rootSelector);
    const history = new HistoryRouter(this.router);
    const state: State = (<any> window).INITIAL_STATE;
    const subject = new Subject<A<any>>();
    const action$ = subject
      .asObservable()
      .do(({ type }) => {
        console.log('action type: ' + type); // logger for action
      })
      .share();
    const app$: O<A<any>> = Observable
      .merge(
        this.app(action$, { state }),
        this.domAction(dom),
        history.changes()
      );
    history.start();
    goTo$(app$).subscribe(path => history.go(path));
    render$(app$)
      .map((state: any) => this.render(state)) // FIXME
      .subscribe(vtree => dom.renderToDOM(vtree));
    app$
      .filter(action => action && !isGoTo(action) && !isRender(action))
      .subscribe((action: A<any>): void => {
        setTimeout(() => subject.next(action));
      });
  }
}

export { Client };
