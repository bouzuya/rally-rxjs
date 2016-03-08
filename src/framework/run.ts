import { A, O, App, run } from 'b-o-a';
import { Executor } from './executor';

type UserApp = (action$: O<A<any>>, options: any) => O<A<any>>;

export default function runUserApp(
  app: UserApp,
  executors: Executor[]
): void {
  run((action$, { re }) => {
    const options = executors.reduce((c, { before }) => before(c), { re });
    const a$: O<A<any>> = executors
      .reduce((a$, { execute }) => a$.map(execute(options)), action$)
      .share();
    const app$ = app(a$, options);
    executors.reduce((c, { after }) => after(c), options);
    return app$;
  });
}
