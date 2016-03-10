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

type RequestMap = {
  [k: string]: {
    request: (params: any) => Promise<any>;
    response: (res: any) => A<any>;
  };
};

// RequestAction to ResponseAction
const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  const requests: RequestMap = {
    'spot-create': {
      request: requestSpotCreate,
      response: responseSpotCreate
    },
    'spot-index': {
      request: requestSpotIndex,
      response: responseSpotIndex
    },
    'stamp-rally-create': {
      request: requestStampRallyCreate,
      response: responseStampRallyCreate
    },
    'stamp-rally-index': {
      request: requestStampRallyIndex,
      response: responseStampRallyIndex
    },
    'stamp-rally-show': {
      request: requestStampRallyShow,
      response: responseStampRallyShow
    },
    'token-create': {
      request: requestTokenCreate,
      response: responseTokenCreate
    }
  };
  return request$(action$)
    .mergeMap(({ path, params: p }) => {
      const { request, response } = requests[path];
      return O.fromPromise(request(p)).map(response);
    });
};

export { $ };
