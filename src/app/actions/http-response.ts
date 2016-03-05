import { A, O } from 'b-o-a';

import { State } from '../models/state';

type HTTP = { request: any; response: any; };
type P = { state: State; http: HTTP; };
const type = 'http-response';

const create = (data: P): A<P> => {
  return { type, data };
};

const from = (action$: O<A<any>>): O<P> => {
  return action$
    .filter(is)
    .map(({ data }) => data);
};

const is = (action: A<any>): boolean => action.type === type;

export { create, from, is };
