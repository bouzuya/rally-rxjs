import { Action } from './action';
import { Observable } from 'rxjs';

type A<T> = Action<T>;
type O<T> = Observable<T>;

export { A, O, Action, Observable };