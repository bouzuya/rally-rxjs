import { Action } from '../../framework/action';

import { State } from '../models/state';

const type = 'render';
const is = (action: Action<any>) => action.type === type;
const create = (state: State): Action<State> => {
  return { type, params: state };
};

export { create, is, type };
export default create;
