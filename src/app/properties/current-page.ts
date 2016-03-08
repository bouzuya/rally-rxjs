
import { A, O } from 'b-o-a';
import {
  from as route$
} from '../../executors/history/route-action';

import { Updater } from '../property-types/updater';

export default function property(
  state: string,
  action$: O<A<any>>
): O<string> {
  return O
    .of(state)
    .merge(route$(action$).map(({ name }) => () => name))
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
