import { Request } from '../../executors/request/';

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

const requests: Request[] = [
  {
    name: 'spot-create',
    request: requestSpotCreate,
    responseToAction: responseSpotCreate
  },
  {
    name: 'spot-index',
    request: requestSpotIndex,
    responseToAction: responseSpotIndex
  },
  {
    name: 'stamp-rally-create',
    request: requestStampRallyCreate,
    responseToAction: responseStampRallyCreate
  },
  {
    name: 'stamp-rally-index',
    request: requestStampRallyIndex,
    responseToAction: responseStampRallyIndex
  },
  {
    name: 'stamp-rally-show',
    request: requestStampRallyShow,
    responseToAction: responseStampRallyShow
  },
  {
    name: 'token-create',
    request: requestTokenCreate,
    responseToAction: responseTokenCreate
  }
];

export { requests };
