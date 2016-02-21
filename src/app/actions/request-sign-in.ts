import { Action } from '../models/action';

import { SignIn } from '../models/sign-in';

const type = 'request-sign-in';
const is = (action: Action<any>) => action.type === type;
const create = (signIn: SignIn): Action<SignIn> => {
  return { type, params: signIn };
};

export { create, is, type };
export default create;