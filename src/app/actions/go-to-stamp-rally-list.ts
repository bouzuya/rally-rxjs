import { Action } from '../models/action';

const type = 'go-to-stamp-rally-list';
const is = (action: Action<any>) => action.type === type;
const create = (): Action<void> => {
  return { type };
};

export { create, is, type };
export default create;