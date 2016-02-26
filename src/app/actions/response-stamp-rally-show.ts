import { Action } from '../../framework/action';

import { StampRally } from '../models/stamp-rally';

const type = 'response-stamp-rally-show';
const is = (action: Action<any>): boolean => action.type === type;
const create = (response: StampRally): Action<StampRally> => {
  return { type, params: response };
};

export { create, is, type };
export default create;