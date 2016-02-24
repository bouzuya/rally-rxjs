import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Updater } from '../models/updater';

import { SpotForm } from '../models/spot-form';
import changeName$ from './spot-form/change-name';

export default function property(
  state: SpotForm,
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<SpotForm> {
  return Observable
    .of(state)
    .merge(
      changeName$(action$)
    )
    .scan((state: SpotForm, updater: Updater<SpotForm>) => {
      return updater(state);
    });
};
