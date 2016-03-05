import { A, O } from 'b-o-a';

type P = {
  path: string;
  params: any;
};
const type = 'request';

const create = (path: string, params: any): A<P> => {
  return { type, data: { path, params } };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
