import { Observable, Subject } from 'rxjs';
import { A, O } from './o-a';
import { DOMExecutor } from './dom-executor';
import { HistoryExecutor } from './history-executor';
import { VTree } from './view';
import { Route } from './router';

class Client<State> {
  private viewRootSelector: string;
  private view: (state: State, options: any) => VTree;
  private app: (
    action$: O<A<any>>,
    options: any
  ) => O<A<any>>;
  private routes: Route[];

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
    this.routes = routes;
  }

  run(): void {
    const state: State = (<any> window).INITIAL_STATE;
    const subject = new Subject<A<any>>();
    const dom = new DOMExecutor(this.viewRootSelector, this.view, subject);
    const history = new HistoryExecutor(this.routes, subject);
    const fs: ((action: A<any>) => A<any>)[] = [
      dom.execute.bind(dom),
      history.execute.bind(history)
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
    const afters = [
      dom.after.bind(dom),
      history.after.bind(history)
    ].forEach(f => f());
    app$.subscribe(action => { setTimeout(() => subject.next(action)); });
  }
}

export { Client };
