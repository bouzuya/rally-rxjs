import { Observable, Subject } from 'rxjs';
import { A, O } from './o-a';
import { DOMExecutor } from './dom-executor';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';
import { from as goTo$, is as isGoTo } from '../app/actions/go-to';

class Client<State> {
  private viewRootSelector: string;
  private view: (state: State, options: any) => VTree;
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
    view: (state: State, options: any) => VTree
  ) {
    this.viewRootSelector = viewRootSelector;
    this.view = view;
    this.app = app;
    this.router = new Router(routes);
  }

  run(): void {
    const state: State = (<any> window).INITIAL_STATE;
    const subject = new Subject<A<any>>();
    const dom = new DOMExecutor(this.viewRootSelector, this.view, subject);
    const history = new HistoryRouter(this.router, subject);
    const fs: ((action: A<any>) => A<any>)[] = [
      (action: A<any>): A<any> => {
        if (!isGoTo(action)) return action;
        const path: string = action.params;
        history.go(path);
        return { type: 'noop' };
      },
      dom.execute.bind(dom)
    ];
    const action$ = fs.reduce(
        (a$, f) => a$.map(f),
        subject
          .asObservable()
          .do(({ type }) => {
            console.log('action type: ' + type); // logger for action
          })
      )
      .filter(action => action && action.type !== 'noop')
      .share();
    const app$ = this.app(action$, { state });
    history.start();
    app$.subscribe(action => { setTimeout(() => subject.next(action)); });
  }
}

export { Client };
