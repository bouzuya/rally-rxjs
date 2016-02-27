import { A, O } from '../../framework/o-a';

import { Spot } from '../models/spot';

type P = Spot[];
const type = 'response-spot-index';

const create = (spots: Spot[]): A<P> => {
  return { type, params: spots };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
