import { A, O } from '../../framework/o-a';

type P = void;
const type = 'success-stamp-rally-show';

const create = (): A<P> => {
  return { type };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
