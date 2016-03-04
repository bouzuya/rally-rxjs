import { A, O } from '../../framework/o-a';

type P = number;
const type = 'click-spot-marker';

const create = (id: P): A<P> => {
  return { type, params: id };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
