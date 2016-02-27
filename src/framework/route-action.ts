import { Observable } from 'rxjs';
import { Action } from './action';
import { InitializerName, InitializerParameters } from './initializer';

type P = {
  name: InitializerName;
  params: InitializerParameters;
};
type RouteAction = Action<P>;
const type = 'route';

const from = (
  action$: Observable<Action<any>>
): Observable<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { from, type, RouteAction };
