import { O, A } from 'b-o-a';

import { State } from '../types/state';

const $ = (_: O<A<any>>, state$: O<State>, options: any): O<A<any>> => {
  const { type }: { type: string; } = options;
  return state$.map(state => ({ type, data: state }));
};

export { $ };
