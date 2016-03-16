import { A, O } from 'b-o-a';

import { Spot } from '../property-type/spot';

type P = Spot[];
const type = 'spot-index';

const create = (spots: Spot[]): A<P> => {
  return { type, data: spots };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === 'response')
    .filter(action => action.data.request.name === type)
    .map(({ data }) => data.response);
};

export { create, from };
