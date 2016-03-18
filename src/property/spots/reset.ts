import { A, O } from 'b-o-a';

import { Updater } from '../../property-type/updater';

import { from as responseSpotIndex$ } from '../../action/response-spot-index';
import { Spot } from '../../property-type/spot';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Spot[]>> {
  return responseSpotIndex$(action$)
    .map(spots => (): Spot[] => spots);
}
