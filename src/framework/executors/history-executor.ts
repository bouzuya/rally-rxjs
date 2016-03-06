import { A } from 'b-o-a';
import { Executor } from '../executor';
import { HistoryRouter } from './history/history-router';
import { Route } from '../route';
import { Router } from '../router';
import { is as isGoTo } from '../../app/actions/go-to';

export default function init(routes: Route[]): Executor {
  const after = (context: any): any => {
    const { history }: { history: HistoryRouter; } = context;
    history.start();
    return context;
  };

  const before = (context: any): any => {
    const { re }: { re: (action: A<any>) => void; } = context;
    const history = new HistoryRouter(new Router(routes), re);
    return Object.assign({}, context, { history });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isGoTo(action)) return action;
    const { history }: { history: HistoryRouter; } = context;
    const path: string = action.data;
    history.go(path);
    return { type: 'noop' };
  };

  return { after, before, execute };
}
