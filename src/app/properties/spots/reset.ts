import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { from as responseSpotIndex$ } from '../../actions/response-spot-index';
import { Spot } from '../../models/spot';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<Spot[]>> {
  return responseSpotIndex$(action$)
    .map(spots => (): Spot[] => spots);
}
