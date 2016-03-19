import { A, O } from 'b-o-a';

import {
  from as reset$
} from '../actions/props/stamp-rallies/reset';

import { StampRally } from '../types/stamp-rally';
import { Updater } from '../types/updater';

export default function property(
  state: StampRally[],
  action$: O<A<any>>
): O<StampRally[]> {
  return O
    .of(state)
    .merge(reset$(action$).map(stampRallies => () => stampRallies))
    .scan((stampRallies: StampRally[], updater: Updater<StampRally[]>) => {
      return updater(stampRallies);
    });
};

