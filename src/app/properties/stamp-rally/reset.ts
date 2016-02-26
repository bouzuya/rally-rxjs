import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { is } from '../../actions/response-stamp-rally-show';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<StampRally>> {
  return action$
    .filter(is)
    .map(({ params: stampRally }) => (): StampRally => {
      return stampRally;
    });
}
