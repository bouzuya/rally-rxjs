import { A, O } from '../../framework/o-a';

import { Updater } from '../models/updater';

import { SpotForm } from '../models/spot-form';
import changeName$ from './spot-form/change-name';

export default function property(
  state: SpotForm,
  action$: O<A<any>>
): O<SpotForm> {
  return O
    .of(state)
    .merge(
      changeName$(action$)
    )
    .scan((state: SpotForm, updater: Updater<SpotForm>) => {
      return updater(state);
    });
};
