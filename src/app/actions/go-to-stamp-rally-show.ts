import { Action } from '../../framework/action';

const type = 'go-to-stamp-rally-show';
const is = (action: Action<any>) => action.type === type;
const create = (stampRallyId: string): Action<string> => {
  return { type, params: stampRallyId };
};

export { create, is, type };
export default create;