import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import { from as changeName$ } from '../../actions/change-stamp-rally-form-name';
import {
  is as isResponseStampRallyCreate
} from '../../actions/response-stamp-rally-create';
import { StampRallyForm } from '../../models/stamp-rally-form';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<StampRallyForm>> {
  return Observable
    .merge(
      changeName$(action$)
        .map(({ value }) => value),
      action$
        .filter(isResponseStampRallyCreate)
        .map(() => null)
    )
    .map(name => (state: StampRallyForm) => Object.assign({}, state, { name }));
}
