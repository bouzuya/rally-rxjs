import { A, O } from 'b-o-a';

import {
  from as changeName$
} from '../actions/props/spot-form/change-name';

import { SpotForm } from '../types/spot-form';
import { Updater } from '../types/updater';

export default function property(
  state: SpotForm,
  action$: O<A<any>>
): O<SpotForm> {
  return O
    .of(state)
    .merge(
    changeName$(action$)
      .map(({ value }) => (state: SpotForm) => {
        return Object.assign({}, state, { name: value });
      })
    )
    .scan((state: SpotForm, updater: Updater<SpotForm>) => {
      return updater(state);
    });
};
