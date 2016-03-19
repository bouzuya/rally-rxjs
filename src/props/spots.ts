import { A, O } from 'b-o-a';

import {
  from as reset$
} from '../actions/props/spots/reset';

import { Spot } from '../types/spot';
import { Updater } from '../types/updater';

export default function property(
  state: Spot[],
  action$: O<A<any>>
): O<Spot[]> {
  return O
    .of(state)
    .merge(reset$(action$).map(spots => () => spots))
    .scan((state: Spot[], updater: Updater<Spot[]>) => {
      return updater(state);
    });
};
