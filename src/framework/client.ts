import { Observable, Subject } from 'rxjs';
import { Action } from './action';
import { DOM } from './dom';
import { VTree } from './view';
import { Route, Router } from './router';
import { HistoryRouter } from './history-router';
import { is as isGoTo } from '../app/actions/go-to';
import { is as isRender } from '../app/actions/render';

class Client<State> {
  private rootSelector: string;
  private render: (state: State) => VTree;
  private app: (
    action$: Observable<Action<any>>,
    options: any
  ) => Observable<Action<any>>;
  private router: Router;
  private domAction: (dom: DOM) => Observable<Action<string>>;

  constructor(
    rootSelector: string,
    render: (state: State) => VTree,
    app: (
      action$: Observable<Action<any>>,
      options: any
    ) => Observable<Action<any>>,
    routes: Route[],
    domAction: (dom: DOM) => Observable<Action<any>>
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
    const subject = new Subject<Action<any>>();
    const action$ = subject
      .asObservable()
      .do(({ type }) => {
        console.log('action type: ' + type); // logger for action
      })
      .share();
    const app$ = this.app(action$, { state });
    history.start();
    app$
      .filter(isGoTo)
      .subscribe(({ params: path }: Action<string>): void => {
        history.go(path)
      });
    app$
      .filter(isRender)
      .map(({ params: state }) => this.render(state))
      .subscribe(vtree => dom.renderToDOM(vtree));
    Observable
      .merge(
        app$.filter(action => action && !isGoTo(action) && !isRender(action)),
        this.domAction(dom),
        history.changes()
      )
      .subscribe((action: Action<any>): void => {
        setTimeout(() => subject.next(action));
      });
  }
}

export { Client };
