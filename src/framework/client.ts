import { Subject } from 'rxjs';
import { A, O } from './o-a';
import { Executor } from './executor';
import { App, AppOptions } from './app';
import run from './run';

type ClientApp = (action$: O<A<any>>, options: any) => O<A<any>>;

const makeApp = (clientApp: ClientApp, executors: Executor[]): App => {
  const app = (action$: O<A<any>>, { re }: AppOptions): O<A<any>> => {
    const options = executors.reduce((c, { before }) => before(c), { re });
    const a$: O<A<any>> = executors
      .reduce((a$, { execute }) => a$.map(execute(options)), action$)
      .share();
    const app$ = clientApp(a$, options);
    executors.reduce((c, { after }) => after(c), options);
    return app$;
  };
  return app;
};

export default function main(
  clientApp: ClientApp,
  executors: Executor[]
): void {
  run(makeApp(clientApp, executors));
}
