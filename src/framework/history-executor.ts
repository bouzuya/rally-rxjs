import { Subject } from 'rxjs';
import { A } from './o-a';
import { HistoryRouter } from './history-router';
import { Route, Router } from './router';
import { is as isGoTo } from '../app/actions/go-to';

export default function init(routes: Route[]) {
  const after = (context: any): any => {
    const { history }: { history: HistoryRouter; } = context;
    history.start();
    return context;
  };

  const before = (context: any): any => {
    const { subject }: { subject: Subject<A<any>>; } = context;
    const history = new HistoryRouter(new Router(routes), subject);
    return Object.assign({}, context, { history });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isGoTo(action)) return action;
    const { history, subject }: {
      history: HistoryRouter;
      subject: Subject<A<any>>;
    } = context;
    const path: string = action.params;
    history.go(path);
    return { type: 'noop' };
  };

  return { after, before, execute };
}
