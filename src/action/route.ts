import { A, O } from 'b-o-a';

type P = {
  route: {
    name: string;
  },
  params: { [k: string]: string; }
};
const type = 'route'; // TODO: specified by app

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
