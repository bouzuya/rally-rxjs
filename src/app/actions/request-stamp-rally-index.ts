import { Action } from '../models/action';

import { Token } from '../models/token';

const type = 'request-stamp-rally-index';
const is = (action: Action<any>) => action.type === type;
const create = (token: Token): Action<Token> => {
  return { type, params: token };
};

export { create, is, type };
export default create;