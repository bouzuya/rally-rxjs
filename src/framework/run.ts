import { A, O, App, run } from 'b-o-a';
import { Executor } from './executor';

type UserApp = (action$: O<A<any>>, options: any) => O<A<any>>;

export default function runUserApp(
  app: UserApp,
  executors: Executor[]
): void {
  run((action$, options) => {
    const opts = executors.map(({ before }) => before)
      .reduce((c, b) => b(c), options);
    const a$ = executors.map(({ execute }) => execute)
      .reduce((a$, e) => a$.map(e(opts)).filter(a => !!a), action$)
      .share();
    const app$ = app(a$, opts);
    executors.map(({ after }) => after)
      .reduce((c, a) => a(c), opts);
    return app$;
  });
}
