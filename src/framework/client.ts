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
    const state: State = (<any> window).INITIAL_STATE;
    const subject = new Subject<A<any>>();
    const history = new HistoryRouter(this.router, subject);
    const fs = [
      (action: A<any>): A<any> => {
        if (!isGoTo(action)) return action;
        const path: string = action.params;
        history.go(path);
        return { type: 'noop' };
      },
      (action: A<any>): A<any> => {
        if (!isRender(action)) return action;
        const state: any = action.params; // FIXME
        const vtree = this.view(state);
        dom.renderToDOM(vtree);
        return { type: 'noop' };
      }
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
    const app$: O<A<any>> = Observable
      .merge(
        this.app(action$, { state }),
        this.viewAction(dom)
      );
    history.start();
    app$.subscribe(action => { setTimeout(() => subject.next(action)); });
  }
}

export { Client };
