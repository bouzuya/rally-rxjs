import { Action } from '../../framework/action';

import { Spot } from '../models/spot';

const type = 'response-spot-create';
const is = (action: Action<any>): boolean => action.type === type;
const create = (response: Spot): Action<Spot> => {
  return { type, params: response };
};

export { create, is, type };
export default create;