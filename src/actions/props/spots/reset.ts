import { A, O } from 'b-o-a';

import { Spot } from '../../../types/spot';

type P = Spot[];
const type = 'props/spots/reset';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
