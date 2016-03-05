import { A, O } from 'b-o-a';

import { Spot } from '../models/spot';

type P = Spot;
const type = 'response-spot-create';

const create = (response: Spot): A<P> => {
  return { type, data: response };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
