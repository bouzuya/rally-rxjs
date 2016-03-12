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

const init = (historyOptions: HistoryOptions, options: any) => {
  const { routes, goToActionType, routeActionType } = historyOptions;
  const { re }: { re: (action: A<any>) => void; } = options;
  const goToType = goToActionType ? goToActionType : 'go-to';
  const routeType = routeActionType ? routeActionType : 'route';
  const router = makeRouter(routes);
  const history = new HistoryRouter(path => {
    const { route: { name }, params } = router(path);
    re({ type: routeType, data: { name, params } });
  });

  return {
    handler: (action$: O<A<any>>, _: any) => {
      return action$.map(action => {
        if (action.type !== goToType) return action;
        const path: string = action.data; // FIXME
        history.go(path);
        return; // return undefined
      });
    },
    options,
    start: () => { history.start(); }
  };
};

export { init };
