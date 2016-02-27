import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import {
  from as responseStampRallyIndex$
} from '../../actions/response-stamp-rally-index';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<StampRally[]>> {
  return responseStampRallyIndex$(action$)
    .map(stampRallies => (): StampRally[] => stampRallies);
}
