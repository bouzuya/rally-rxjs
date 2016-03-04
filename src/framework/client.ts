import { Subject } from 'rxjs';
import { A, O } from './o-a';
import { Executor } from './executor';

export default function run(
  app: (
    action$: O<A<any>>,
    options: any
  ) => O<A<any>>,
  executors: Executor[]
) {
  const subject = new Subject<A<any>>();
  const re = (action: A<any>) => setTimeout(() => subject.next(action));
  const context = executors.reduce((c, { before }) => before(c), { re });
  const action$ = executors
    .reduce(
      (a$, { execute }) => a$.map(execute(context)),
      subject
        .asObservable()
        .do(({ type }) => {
          console.log('action type: ' + type); // logger for action
        })
    )
    .filter(action => action && action.type !== 'noop')
    .share();
  const app$ = app(action$, context);
  executors.reduce((c, { after }) => after(c), context);
  app$.subscribe(re);
}
