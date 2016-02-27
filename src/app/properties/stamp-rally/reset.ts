import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import {
  from as responseStampRallyShow$
} from '../../actions/response-stamp-rally-show';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<StampRally>> {
  return responseStampRallyShow$(action$)
    .map(stampRally => (): StampRally => stampRally);
}
