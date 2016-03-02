import { A } from './o-a';
import { Router, RouteAction } from './router';
import { Observable, Subject } from 'rxjs';

class HistoryRouter {
  private router: Router;
  private window: any;
  private history: History;
  private subject: Subject<RouteAction>;

  constructor(router: Router, subject: Subject<A<any>>) {
    this.window = Function('return this')();
    this.history = this.window.history;
    this.router = router;
    this.subject = subject;
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
    this.subject.next(this.router.routes(path));
  }

  start(): void {
    if (this.history) {
      this.window.addEventListener('popstate', () => {
        const path = this.window.location.pathname;
        console.log('back : ' + path);
        this.subject.next(this.router.routes(path));
      }, false);
    }
  }
}

export { HistoryRouter };