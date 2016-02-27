
import { A, O, Observable } from '../../framework/o-a';
import { from as route$ } from '../../framework/route-action';

import { Updater } from '../models/updater';

export default function property(
  state: string,
  action$: O<A<any>>
): O<string> {
  return Observable
    .of(state)
    .merge(route$(action$).map(({ name }) => () => name))
    .scan((state: string, updater: Updater<string>) => {
      return updater(state);
    });
};
