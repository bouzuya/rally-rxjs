// History API Action (pushState / onpopstate event) -> RouteAction
// GoToAction -> History API Action

// TODO: GoBackAction

import { A } from 'b-o-a';
import { Executor } from '../../framework/executor';
import { Route } from '../../framework/route';
import { init as makeRouter } from 'boajs-router';
import { HistoryRouter } from './history-router';
import { is as isGoTo } from './go-to-action';
import { create as route } from './route-action';

export default function init(routes: Route[]): Executor {
  const after = (context: any): any => {
    const { history }: { history: HistoryRouter; } = context;
    history.start();
    return context;
  };

  const before = (context: any): any => {
    const { re }: { re: (action: A<any>) => void; } = context;
    const router = makeRouter(routes);
    const history = new HistoryRouter(path => {
      const { route: { name }, params } = router(path);
      re(route({ name, params }));
    });
    return Object.assign({}, context, { history });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isGoTo(action)) return action;
    const { history }: { history: HistoryRouter; } = context;
    const path: string = action.data;
    history.go(path);
    return; // return undefined
  };

  return { after, before, execute };
}
