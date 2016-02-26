import { Action } from '../../framework/action';

const type = 'success-stamp-rally-show';
const is = (action: Action<any>) => action.type === type;
const create = (): Action<void> => {
  return { type };
};

export { create, is, type };
export default create;