import { A } from './o-a';
import { RouteAction } from './route-action';
import { Router } from './router';

class HistoryRouter {
  private router: Router;
  private window: any;
  private history: History;
  private re: (action: RouteAction) => void;

  constructor(router: Router, re: (action: RouteAction) => void) {
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
    this.re(this.router.routes(path));
  }

  start(): void {
    if (this.history) {
      this.window.addEventListener('popstate', () => {
        const path = this.window.location.pathname;
        console.log('back : ' + path);
        this.re(this.router.routes(path));
      }, false);
    }
  }
}

export { HistoryRouter };