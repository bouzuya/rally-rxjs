import { Subject } from 'rxjs';
import { A, O } from './o-a';
import { Init, InitOptions } from './init';

export default function run(init: Init): void {
  const subject = new Subject<A<any>>();
  const action$ = subject
    .asObservable()
    .filter(action => action && action.type !== 'noop')
    .do(({ type }) => console.log('action type: ' + type)) // logger
    .share();
  const re = (action: A<any>) => setTimeout(() => subject.next(action));
  init(action$, { re }).subscribe(re);
};
