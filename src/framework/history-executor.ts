import { Subject } from 'rxjs';
import { A } from './o-a';
import { HistoryRouter } from './history-router';
import { Route, Router } from './router';
import { is as isGoTo } from '../app/actions/go-to';

class HistoryExecutor {
  private history: HistoryRouter;
  private subject: Subject<A<any>>;

  constructor(routes: Route[], subject: Subject<A<any>>) {
    this.history = new HistoryRouter(new Router(routes), subject);
  }

  after(): void {
    this.history.start();
  }

  execute(action: A<any>): A<any> {
    if (!isGoTo(action)) return action;
    const path: string = action.params;
    this.history.go(path);
    return { type: 'noop' };
  }
}

export { HistoryExecutor };