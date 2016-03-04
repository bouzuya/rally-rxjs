import { A, O } from '../../framework/o-a';
import { State } from '../models/state';

type P = State;
const type = 'render';

const create = (state: State): A<P> => {
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
