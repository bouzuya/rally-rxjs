import { A, O } from '../../framework/o-a';

import { Token } from '../models/token';

type P = Token;
const type = 'response-token-create';

const create = (response: Token): A<P> => {
  return { type, params: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
