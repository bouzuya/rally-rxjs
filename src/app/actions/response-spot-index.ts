import { Action } from '../models/action';

import { Spot } from '../models/spot';

const type = 'response-spot-index';
const is = (action: Action<any>): boolean => action.type === type;
const create = (spots: Spot[]): Action<Spot[]> => {
  return { type, params: spots };
};

export { create, is, type };
export default create;