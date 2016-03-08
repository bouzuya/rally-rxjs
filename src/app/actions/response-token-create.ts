import { A, O } from 'b-o-a';

import { Token } from '../property-types/token';

type P = Token;
const type = 'response-token-create';

const create = (response: Token): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
