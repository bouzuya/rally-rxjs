import { A, O } from 'b-o-a';

import { Updater } from '../../types/updater';

import {
  from as changeName$
} from '../../actions/views/change-spot-form-name';
import {
  from as responseSpotCreate$
} from '../../actions/response-spot-create';
import { SpotForm } from '../../types/spot-form';

export default function updater$(
  action$: O<A<any>>
): O<Updater<SpotForm>> {
  return O
    .merge(
      changeName$(action$)
        .map(({ value }) => value),
      responseSpotCreate$(action$)
        .map(() => null)
    )
    .map(name => (state: SpotForm) => Object.assign({}, state, { name }));
}
