import { Subject } from 'rxjs';
import { A, O } from './o-a';
import { Executor } from './executor';
import { Init, InitOptions } from './init';
import run from './run';

type App = (action$: O<A<any>>, options: any) => O<A<any>>;

const makeInit = (app: App, executors: Executor[]): Init => {
  const init = (action$: O<A<any>>, { re }: InitOptions): O<A<any>> => {
    const options = executors.reduce((c, { before }) => before(c), { re });
    const a$: O<A<any>> = executors
      .reduce((a$, { execute }) => a$.map(execute(options)), action$)
      .share();
    const app$ = app(a$, options);
    executors.reduce((c, { after }) => after(c), options);
    return app$;
  };
  return init;
};

export default function main(app: App, executors: Executor[]): void {
  run(makeInit(app, executors));
}
