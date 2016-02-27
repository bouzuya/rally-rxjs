import { Action } from './action';
import { InitializerParameters } from './initializer';

const type = 'route';
const is = (action: Action<any>) => action.type === type;

type RouteAction = Action<InitializerParameters>;

export { is, type, RouteAction };
