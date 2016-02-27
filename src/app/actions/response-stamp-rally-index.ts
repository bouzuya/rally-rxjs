import { A, O } from '../../framework/o-a';

import { StampRally } from '../models/stamp-rally';

type P = StampRally[];
const type = 'response-stamp-rally-index';

const create = (response: StampRally[]): A<P> => {
  return { type, params: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
