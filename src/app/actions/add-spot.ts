import { Observable } from 'rxjs';
import { Action } from '../../framework/action';

type P = void;
const type = 'add-spot';

const create = (): Action<P> => {
  return { type };
};
const from = (
  action$: Observable<Action<any>>
): Observable<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };