import { A, O } from 'b-o-a';
import { InitializerName, InitializerParameters } from './initializer';

type P = {
  name: InitializerName;
  params: InitializerParameters;
};
type RouteAction = A<P>;
const type = 'route';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (
  action$: O<A<any>>
): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from, RouteAction };
