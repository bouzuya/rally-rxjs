import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/response-stamp-rally-index';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<StampRally[]>> {
  return action$
    .filter(is)
    .map(({ params: stampRallies }) => (): StampRally[] => {
      return stampRallies;
    });
}
