import { A, O } from '../../../framework/o-a';

import { Updater } from '../../models/updater';

import { from as responseSpotIndex$ } from '../../actions/response-spot-index';
import { Spot } from '../../models/spot';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Spot[]>> {
  return responseSpotIndex$(action$)
    .map(spots => (): Spot[] => spots);
}
