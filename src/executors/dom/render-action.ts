import { A, O } from 'b-o-a';

type P = any;
const type = 'render';

const create = (state: any): A<P> => {
  return { type, data: state };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

// TODO: This function should be removed.
const is = (action: A<any>): boolean => {
  return action.type === type;
};

export { create, from, is };
