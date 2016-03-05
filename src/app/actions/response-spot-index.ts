import { A, O } from 'b-o-a';

import { Spot } from '../models/spot';

type P = Spot[];
const type = 'response-spot-index';

const create = (spots: Spot[]): A<P> => {
  return { type, data: spots };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
