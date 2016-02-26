import { Action } from '../../framework/action';

import { Token } from '../models/token';

const type = 'response-token-create';
const is = (action: Action<any>): boolean => action.type === type;
const create = (response: Token): Action<Token> => {
  return { type, params: response };
};

export { create, is, type };
export default create;