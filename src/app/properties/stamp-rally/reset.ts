import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/response-stamp-rally-show';
import { create } from '../../actions/success-stamp-rally-show';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): Observable<Updater<StampRally>> {
  return action$
    .filter(is)
    .map(({ params: stampRally }) => (): StampRally => {
      reaction(create());
      return stampRally;
    });
}
