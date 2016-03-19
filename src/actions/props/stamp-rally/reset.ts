import { A, O } from 'b-o-a';

import { StampRally } from '../../../types/stamp-rally';

type P = StampRally;
const type = 'props/stamp-rally/reset';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
