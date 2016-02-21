import { Action } from '../models/action';

const type = 'go-to-sign-in';
const is = (action: Action<any>) => action.type === type;
const create = (): Action<void> => {
  return { type };
};

export { create, is, type };
export default create;