import { A } from 'b-o-a';
import { create as route, RouteAction } from './route-action';
import { Router } from 'boajs-router';
import { Route } from '../../framework/route';

class HistoryRouter {
  private router: Router<Route>;
  private window: any;
  private history: History;
  private re: (action: RouteAction) => void;

  constructor(router: Router<Route>, re: (action: RouteAction) => void) {
    this.window = Function('return this')();
    this.history = this.window.history;
    this.router = router;
    this.re = re;
  }

  back(): void {
    if (this.history) {
      this.history.back();
    }
  }

  go(path: string, replace: boolean = false): void {
    console.log('go : ' + path);
    if (this.history) {
      const f = replace ? history.replaceState : history.pushState;
      f.apply(history, [null, null, path]);
    }
    this.route(path);
  }

  start(): void {
    if (this.history) {
      this.window.addEventListener('popstate', () => {
        const path = this.window.location.pathname;
        console.log('back : ' + path);
        this.route(path);
      }, false);
    }
  }

  private route(path): void {
    const { route: { name }, params } = this.router(path);
    this.re(route({ name, params }));
  }
}

export { HistoryRouter };
