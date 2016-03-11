import { A, O } from 'b-o-a';

type P = number;
const type = 'click-spot-marker';

const create = (id: P): A<P> => {
  return { type, data: id };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
