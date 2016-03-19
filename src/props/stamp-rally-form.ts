import { A, O } from 'b-o-a';

import {
  from as changeName$
} from '../actions/props/stamp-rally-form/change-name';

import { StampRallyForm } from '../types/stamp-rally-form';
import { Updater } from '../types/updater';

export default function property(
  state: StampRallyForm,
  action$: O<A<any>>
): O<StampRallyForm> {
  return O
    .of(state)
    .merge(
    changeName$(action$)
      .map(({ value }) => (state: StampRallyForm) => {
        return Object.assign({}, state, { name: value });
      })
    )
    .scan((state: StampRallyForm, updater: Updater<StampRallyForm>) => {
      return updater(state);
    });
};

