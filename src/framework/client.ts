import { Observable, Subject } from 'rxjs';
import { A, O } from './o-a';
import { DOM } from './dom';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';
import { from as goTo$, is as isGoTo } from '../app/actions/go-to';
import { from as render$, is as isRender } from '../app/actions/render';

class Client<State> {
  private viewRootSelector: string;
  private view: (state: State) => VTree;
  private viewAction: (dom: DOM) => O<A<string>>;
  private app: (
    action$: O<A<any>>,
    options: any
  ) => O<A<any>>;
  private router: Router;

  constructor(
    app: (
      action$: O<A<any>>,
      options: any
    ) => O<A<any>>,
    // for Router
    routes: Route[],
    // for View Renderer
    viewRootSelector: string,
    view: (state: State) => VTree,
    viewAction: (dom: DOM) => O<A<any>>
  ) {
    this.viewRootSelector = viewRootSelector;
    this.view = view;
    this.viewAction = viewAction;
    this.app = app;
    this.router = new Router(routes);
  }

  run(): void {
    const dom = new DOM(this.viewRootSelector);
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
        this.viewAction(dom),
        history.changes()
      );
    history.start();
    goTo$(app$).subscribe(path => history.go(path));
    render$(app$)
      .map((state: any) => this.view(state)) // FIXME
      .subscribe(vtree => dom.renderToDOM(vtree));
    app$
      .filter(action => action && !isGoTo(action) && !isRender(action))
      .subscribe((action: A<any>): void => {
        setTimeout(() => subject.next(action));
      });
  }
}

export { Client };
