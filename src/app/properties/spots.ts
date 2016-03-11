import { A, O } from 'b-o-a';

import { Updater } from '../property-type/updater';

import { Spot } from '../property-type/spot';
import reset$ from './spots/reset';

export default function property(
  state: Spot[],
  action$: O<A<any>>
): O<Spot[]> {
  return O
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Spot[], updater: Updater<Spot[]>) => {
      return updater(state);
    });
};
