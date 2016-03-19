import { A, O } from 'b-o-a';

import { StampRally } from '../../../types/stamp-rally';

type P = StampRally;
const type = 'requests/response/stamp-rally-show';

const create = (response: StampRally): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === 'response')
    .filter(action => 'requests/response/' + action.data.request.name === type)
    .map(({ data }) => data.response);
};

export { create, from };
