import { A, O } from '../../framework/o-a';

type P = { value: string; };
const type = 'change-password';

const create = (value: string): A<P> => {
  return { type, params: { value } };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ params }) => params);
};

export { create, from };
