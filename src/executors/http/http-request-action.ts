import { A, O } from 'b-o-a';

type P = {
  route: any;
  params: any;
  http: any;
};
const type = 'http-request';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

const is = (action: A<any>): boolean => action.type === type;

export { create, from, is };
