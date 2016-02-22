import { Observable } from 'rxjs';

import { Action } from '../../models/action';
import { Updater } from '../../models/updater';

import {
  is as isGoToSignIn
} from '../../actions/go-to-sign-in';
import {
  is as isGoToStampRallyList
} from '../../actions/go-to-stamp-rally-list';
import {
  is as isGoToStampRallyShow
} from '../../actions/go-to-stamp-rally-show';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<string>> {
  return Observable
    .merge(
      action$.filter(isGoToSignIn).map(() => 'sign-in'),
      action$.filter(isGoToStampRallyList).map(() => 'stamp-rally-list'),
      action$.filter(isGoToStampRallyShow).map(() => 'stamp-rally-show')
    )
    .map((path: string) => () => path);
}
