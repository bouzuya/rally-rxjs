import { Observable } from 'rxjs';
import { Action } from '../../framework/action';

import { from as request$ } from '../actions/request';
import requestSpotCreate from '../requests/spot-create';
import requestSpotIndex from '../requests/spot-index';
import requestStampRallyCreate from '../requests/stamp-rally-create';
import requestStampRallyIndex from '../requests/stamp-rally-index';
import requestStampRallyShow from '../requests/stamp-rally-show';
import requestTokenCreate from '../requests/token-create';
import { create as responseSpotCreate } from '../actions/response-spot-create';
import { create as responseSpotIndex } from '../actions/response-spot-index';
import {
  create as responseStampRallyCreate
} from '../actions/response-stamp-rally-create';
import {
  create as responseStampRallyIndex
} from '../actions/response-stamp-rally-index';
import {
  create as responseStampRallyShow
} from '../actions/response-stamp-rally-show';
import {
  create as responseTokenCreate
} from '../actions/response-token-create';

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
  const request$s = [
    ['spot-create', requestSpotCreate, responseSpotCreate],
    ['spot-index', requestSpotIndex, responseSpotIndex],
    ['stamp-rally-create', requestStampRallyCreate, responseStampRallyCreate],
    ['stamp-rally-index', requestStampRallyIndex, responseStampRallyIndex],
    ['stamp-rally-show', requestStampRallyShow, responseStampRallyShow],
    ['token-create', requestTokenCreate, responseTokenCreate]
  ].map(args =>
    request.apply(null, (<any[]>[request$(action$)]).concat(args))
  );
  return Observable.merge.apply(Observable, request$s);
}

