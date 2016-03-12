// History API Action (pushState / onpopstate event) -> RouteAction
// GoToAction -> History API Action

// TODO: GoBackAction

import { A, O } from 'b-o-a';

import { init as makeRouter } from 'boajs-router';
import { Route } from '../../framework/route';
import { HistoryRouter } from './history-router';

type HistoryOptions = {
  goToActionType?: string;
  routes: Route[];
  routeActionType?: string;
};

const init = (historyOptions: HistoryOptions) => {
  const { routes, goToActionType, routeActionType } = historyOptions;
  const goToType = goToActionType ? goToActionType : 'go-to';
  const routeType = routeActionType ? routeActionType : 'route';
  const router = makeRouter(routes);

  return {
    handler: (action$: O<A<any>>, options: any) => {
      const { re }: { re: (action: A<any>) => void; } = options;
      const history = new HistoryRouter(path => {
        const { route: { name }, params } = router(path);
        re({ type: routeType, data: { name, params } });
      });
      return O.merge(
        action$.map(action => {
          if (action.type !== goToType) return action;
          const path: string = action.data; // FIXME
          history.go(path);
          return; // return undefined
        }),
        action$.first().do(() => {
          history.start();
        })
      ).share();
    }
  };
};

export { init };
