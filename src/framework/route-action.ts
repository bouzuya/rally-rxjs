import { Observable } from 'rxjs';
import { Action } from './action';
import { InitializerName, InitializerParameters } from './initializer';

type P = {
  name: InitializerName;
  params: InitializerParameters;
};
type RouteAction = Action<P>;
const type = 'route';

const is = (action: Action<any>) => action.type === type;
const filter = (
  action$: Observable<Action<any>>
): Observable<P> => {
  return action$.filter(is).map(({ params }) => params);
};

export { filter, type, RouteAction };
