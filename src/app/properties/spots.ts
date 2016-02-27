import { A, O, Observable } from '../../framework/o-a';

import { Updater } from '../models/updater';

import { Spot } from '../models/spot';
import reset$ from './spots/reset';

export default function property(
  state: Spot[],
  action$: O<A<any>>
): O<Spot[]> {
  return Observable
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Spot[], updater: Updater<Spot[]>) => {
      return updater(state);
    });
};
