import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is as isChangeName } from '../../actions/change-spot-form-name';
import { is as isResponseSpotCreate } from '../../actions/response-spot-create';
import { SpotForm } from '../../models/spot-form';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SpotForm>> {
  return Observable
    .merge(
      action$
        .filter(isChangeName)
        .map(({ params: { value } }) => value),
      action$
        .filter(isResponseSpotCreate)
        .map(() => null)
    )
    .map(name => (state: SpotForm) => Object.assign({}, state, { name }));
}
