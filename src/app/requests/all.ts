import { Observable } from 'rxjs';
import { Action } from '../../framework/action';

import { is } from '../actions/request';
import requestSpotCreate from '../requests/spot-create';
import requestSpotIndex from '../requests/spot-index';
import requestStampRallyCreate from '../requests/stamp-rally-create';
import requestStampRallyIndex from '../requests/stamp-rally-index';
import requestStampRallyShow from '../requests/stamp-rally-show';
import requestTokenCreate from '../requests/token-create';
import responseSpotCreate from '../actions/response-spot-create';
import responseSpotIndex from '../actions/response-spot-index';
import responseStampRallyCreate from '../actions/response-stamp-rally-create';
import responseStampRallyIndex from '../actions/response-stamp-rally-index';
import responseStampRallyShow from '../actions/response-stamp-rally-show';
import responseTokenCreate from '../actions/response-token-create';

const request = (
  request$: Observable<Action<any>>,
  path: string,
  request: (params: any) => Promise<any>,
  response: (res: any) => Action<any>
): Observable<Action<any>> => {
  return request$
    .filter(({ params: { path: p } }) => p === path)
    .mergeMap(({ params: { params: p } }) => {
      return Observable.fromPromise(request(p));
    })
    .map(r => response(r));
};

// RequestAction to ResponseAction
export default function all(
  action$: Observable<Action<any>>
): Observable<Action<any>> {
  const request$ = action$.filter(is);
  const requests = [
    ['spot-create', requestSpotCreate, responseSpotCreate],
    ['spot-index', requestSpotIndex, responseSpotIndex],
    ['stamp-rally-create', requestStampRallyCreate, responseStampRallyCreate],
    ['stamp-rally-index', requestStampRallyIndex, responseStampRallyIndex],
    ['stamp-rally-show', requestStampRallyShow, responseStampRallyShow],
    ['token-create', requestTokenCreate, responseTokenCreate]
  ].map(args => request.apply(null, (<any[]>[request$]).concat(args)));
  return Observable.merge.apply(Observable, requests);
}

