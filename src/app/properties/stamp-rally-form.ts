import { A, O, Observable } from '../../framework/o-a';

import { Updater } from '../models/updater';

import { StampRallyForm } from '../models/stamp-rally-form';
import changeName$ from './stamp-rally-form/change-name';

export default function property(
  state: StampRallyForm,
  action$: O<A<any>>
): O<StampRallyForm> {
  return Observable
    .of(state)
    .merge(
      changeName$(action$)
    )
    .scan((state: StampRallyForm, updater: Updater<StampRallyForm>) => {
      return updater(state);
    });
};

