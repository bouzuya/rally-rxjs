import { A, O } from 'b-o-a';

import { Updater } from '../../types/updater';

import { from as responseSpotIndex$ } from '../../actions/response-spot-index';
import { Spot } from '../../types/spot';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Spot[]>> {
  return responseSpotIndex$(action$)
    .map(spots => (): Spot[] => spots);
}
