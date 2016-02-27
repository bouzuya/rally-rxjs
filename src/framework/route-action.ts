import { A, O } from './o-a';
import { InitializerName, InitializerParameters } from './initializer';

type P = {
  name: InitializerName;
  params: InitializerParameters;
};
type RouteAction = A<P>;
const type = 'route';

const from = (
  action$: O<A<any>>
): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { from, type, RouteAction };
