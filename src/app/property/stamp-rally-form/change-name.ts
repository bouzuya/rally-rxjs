import { A, O } from 'b-o-a';

import { Updater } from '../../property-type/updater';

import { from as changeName$ } from '../../action/change-stamp-rally-form-name';
import {
  from as responseStampRallyCreate$
} from '../../action/response-stamp-rally-create';
import { StampRallyForm } from '../../property-type/stamp-rally-form';

export default function updater$(
  action$: O<A<any>>
): O<Updater<StampRallyForm>> {
  return O
    .merge(
      changeName$(action$)
        .map(({ value }) => value),
      responseStampRallyCreate$(action$)
        .map(() => null)
    )
    .map(name => (state: StampRallyForm) => Object.assign({}, state, { name }));
}
