import { A, O } from 'b-o-a';

import { Updater } from '../property-type/updater';

import { StampRallyForm } from '../property-type/stamp-rally-form';
import changeName$ from './stamp-rally-form/change-name';

export default function property(
  state: StampRallyForm,
  action$: O<A<any>>
): O<StampRallyForm> {
  return O
    .of(state)
    .merge(
      changeName$(action$)
    )
    .scan((state: StampRallyForm, updater: Updater<StampRallyForm>) => {
      return updater(state);
    });
};

