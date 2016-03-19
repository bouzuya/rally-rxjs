import { A, O } from 'b-o-a';

import { Token } from '../../../types/token';

type P = Token;
const type = 'props/token/reset';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
