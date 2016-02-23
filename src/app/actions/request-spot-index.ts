import { Action } from '../models/action';

import { Token } from '../models/token';

const type = 'request-spot-index';
const is = (action: Action<any>) => action.type === type;
const create = (token: string, stampRallyId: string): Action<{
  token: string;
  stampRallyId: string;
}> => {
  return { type, params: { token, stampRallyId } };
};

export { create, is, type };
export default create;