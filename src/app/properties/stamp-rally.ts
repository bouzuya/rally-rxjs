import { A, O } from 'b-o-a';

import { Updater } from '../property-type/updater';

import { StampRally } from '../property-type/stamp-rally';
import reset$ from './stamp-rally/reset';

export default function stampRally$(
  state: StampRally,
  action$: O<A<any>>
): O<StampRally> {
  return O
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: StampRally, updater: Updater<StampRally>) => {
      return updater(state);
    });
};

