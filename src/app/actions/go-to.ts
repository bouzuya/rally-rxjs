import { Action } from '../../framework/action';

const type = 'go-to';
const is = (action: Action<any>) => action.type === type;
const create = (path: string): Action<string> => {
  return { type, params: path };
};

export { create, is, type };
export default create;