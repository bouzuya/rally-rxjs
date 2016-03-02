import { Subject } from 'rxjs';
import { A, O } from './o-a';

type Executor = {
  after: (context: any) => any;
  before: (context: any) => any;
  execute: (context: any) => (action: A<any>) => A<any>;
};

class Client {
  private app: (
    action$: O<A<any>>,
    options: any
  ) => O<A<any>>;
  private executors: Executor[];

  constructor(
    app: (
      action$: O<A<any>>,
      options: any
    ) => O<A<any>>,
    executors: Executor[]
  ) {
    this.app = app;
    this.executors = executors;
  }

  run(): void {
    const subject = new Subject<A<any>>();
    const context = this.executors.reduce(
      (c, { before }) => before(c),
      { subject }
    );
    const action$ = this.executors.reduce(
        (a$, { execute }) => a$.map(execute(context)),
        subject
          .asObservable()
          .do(({ type }) => {
            console.log('action type: ' + type); // logger for action
          })
      )
      .filter(action => action && action.type !== 'noop')
      .share();
    const app$ = this.app(action$, context);
    this.executors.reduce(
      (c, { after }) => after(c),
      context
    );
    app$.subscribe(action => { setTimeout(() => subject.next(action)); });
  }
}

export { Client };
