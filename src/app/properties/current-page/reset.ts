import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

export default function updater$(
  action$: Observable<Action>
): Observable<Updater<string>> {
  return action$
    .filter(({ type }) => type === 'go-to-stamp-rally-list')
    .map(() => (state: string) => {
      return 'stamp-rally-list';
    });
}
