import { A, O } from 'b-o-a';

type P = void;
const type = 'add-stamp-rally';

const create = (): A<P> => {
  return { type };
};
const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
