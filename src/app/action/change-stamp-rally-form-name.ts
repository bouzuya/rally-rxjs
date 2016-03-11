import { A, O } from 'b-o-a';

type P = { value: string; };
const type = 'change-stamp-rally-form-name';

const create = (value: string): A<P> => {
  return { type, data: { value } };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(action => action.type === type)
    .map(({ data }) => data);
};

export { create, from };
