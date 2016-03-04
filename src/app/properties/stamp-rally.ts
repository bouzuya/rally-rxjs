import { A, O } from '../../framework/o-a';

import { Updater } from '../models/updater';

import { StampRally } from '../models/stamp-rally';
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

