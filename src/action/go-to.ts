import { A, O } from 'b-o-a';

type P = string;
const type = 'go-to'; // TODO: specified by app

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
