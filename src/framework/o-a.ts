import { Action } from './action';
import { Observable } from 'rxjs';

type A<T> = Action<T>;
type O<T> = Observable<T>;

const O = Observable;

export { A, O, Action };