
import { A, O } from 'b-o-a';
import {
  from as route$
} from '../../framework/executors/history/route-action';

import { Updater } from '../models/updater';

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
