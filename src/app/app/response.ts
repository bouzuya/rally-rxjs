import { A, O } from 'b-o-a';

import { from as request$ } from '../actions/request';
import { State } from '../property-types/state';
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
  request$: O<any>,
  path: string,
  request: (params: any) => Promise<any>,
  response: (res: any) => A<any>
): O<A<any>> => {
  return request$
    .filter(({ path: p }) => p === path)
    .mergeMap(({ params: p }) => {
      return O.fromPromise(request(p));
    })
    .map(r => response(r));
};

// RequestAction to ResponseAction
const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
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
  return O.merge.apply(O, request$s);
};

export { $ };
