import { Subject } from 'rxjs';
import { A, O } from './o-a';
import { App, AppOptions } from './app';

export default function run(app: App): void {
  const subject = new Subject<A<any>>();
  const action$ = subject
    .asObservable()
    .filter(action => action && action.type !== 'noop')
    .do(({ type }) => console.log('action type: ' + type)) // logger
    .share();
  const re = (action: A<any>) => setTimeout(() => subject.next(action));
  app(action$, { re }).subscribe(re);
};
