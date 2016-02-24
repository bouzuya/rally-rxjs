import { Action } from '../models/action';

import { Token } from '../models/token';

const type = 'request';
const is = (action: Action<any>) => action.type === type;
const create = (path: string, params: any): Action<{
  path: string;
  params: any;
}> => {
  return { type, params: { path, params } };
};

export { create, is, type };
export default create;