import { A, O } from '../../framework/o-a';

import { StampRally } from '../models/stamp-rally';

type P = StampRally;
const type = 'response-stamp-rally-show';

const create = (response: StampRally): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
