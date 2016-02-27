import { Action } from './action';
import { InitializerName, InitializerParameters } from './initializer';

const type = 'route';
const is = (action: Action<any>) => action.type === type;

type RouteAction = Action<{
  name: InitializerName;
  params: InitializerParameters;
}>;

export { is, type, RouteAction };
