import { A, O, Observable } from '../../../framework/o-a';

import { Updater } from '../../models/updater';

import { from as changeName$ } from '../../actions/change-spot-form-name';
import {
  from as responseSpotCreate$
} from '../../actions/response-spot-create';
import { SpotForm } from '../../models/spot-form';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SpotForm>> {
  return Observable
    .merge(
      changeName$(action$)
        .map(({ value }) => value),
      responseSpotCreate$(action$)
        .map(() => null)
    )
    .map(name => (state: SpotForm) => Object.assign({}, state, { name }));
}
