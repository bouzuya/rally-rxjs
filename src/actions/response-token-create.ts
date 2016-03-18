import { A, O } from 'b-o-a';

import { Token } from '../types/token';

type P = Token;
const type = 'token-create';

const create = (response: Token): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === 'response')
    .filter(action => action.data.request.name === type)
    .map(({ data }) => data.response);
};

export { create, from };
