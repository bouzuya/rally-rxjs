import { A, O } from '../../framework/o-a';

type P = {
  path: string;
  params: any;
};
const type = 'request';

const create = (path: string, params: any): A<P> => {
  return { type, params: { path, params } };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
