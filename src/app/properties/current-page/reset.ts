import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import { is } from '../../actions/go-to-stamp-rally-list';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<string>> {
  return action$
    .filter(is)
    .map(() => (state: string) => {
      return 'stamp-rally-list';
    });
}
