import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/change-spot-form-name';
import { SpotForm } from '../../models/spot-form';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<SpotForm>> {
  return action$
    .filter(is)
    .map(({ params: { value } }) => (state: SpotForm) => {
      return Object.assign({}, state, { name: value });
    });
}
