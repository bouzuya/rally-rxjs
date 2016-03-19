import { A, O } from 'b-o-a';

import { Spot } from '../../../types/spot';

type P = Spot;
const type = 'requests/response/spot-create';

const create = (response: Spot): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === 'response')
    .filter(action => 'requests/response/' + action.data.request.name === type)
    .map(({ data }) => data.response);
};

export { create, from };
