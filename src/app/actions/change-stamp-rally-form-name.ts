import { Action } from '../models/action';

const type = 'change-stamp-rally-form-name';
const is = (action: Action<any>) => action.type === type;
const create = (value: string): Action<{ value: string; }> => {
  return { type, params: { value } };
};

export { create, is, type };
export default create;