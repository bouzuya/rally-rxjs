import { A, O } from 'b-o-a';

import { Updater } from '../models/updater';

import { StampRally } from '../models/stamp-rally';
import reset$ from './stamp-rallies/reset';

export default function users$(
  state: StampRally[],
  action$: O<A<any>>
): O<StampRally[]> {
  return O
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((users: StampRally[], updater: Updater<StampRally[]>) => {
      return updater(users);
    });
};

