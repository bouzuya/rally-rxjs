import { A, O } from '../../framework/o-a';

type P = string;
const type = 'go-to';

const create = (path: string): A<P> => {
  return { type, params: path };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

// TODO: This function should be removed.
const is = (action: A<any>): boolean => {
  return action.type === type;
};

export { create, from, is };
