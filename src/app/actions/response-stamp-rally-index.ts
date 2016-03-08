import { A, O } from 'b-o-a';

import { StampRally } from '../property-types/stamp-rally';

type P = StampRally[];
const type = 'response-stamp-rally-index';

const create = (response: StampRally[]): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
