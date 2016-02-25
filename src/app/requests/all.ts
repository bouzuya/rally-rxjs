import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Spot } from '../models/spot';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

import { create as createSpotCreate } from '../actions/response-spot-create';
import { is } from '../actions/request';
import spotCreate from '../requests/spot-create';

import { create as createSpotIndex } from '../actions/response-spot-index';
import spotIndex from '../requests/spot-index';

import {
  create as createStampRallyIndex
} from '../actions/response-stamp-rally-index';
import stampRallyIndex from '../requests/stamp-rally-index';

import {
  create as createStampRallyShow
} from '../actions/response-stamp-rally-show';
import stampRallyShow from '../requests/stamp-rally-show';

import {
  create as createTokenCreate
} from '../actions/response-token-create';
import tokenCreate from '../requests/token-create';

export default function request(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): void {
  const request$ = action$.filter(is);
  const subscribe = (
    path: string,
    request: (params: any) => Promise<any>,
    response: (res: any) => Action<any>
  ): void => {
    request$
      .filter(({ params: { path: p } }) => p === path)
      .mergeMap(({ params: { params: p } }) => {
        return Observable.fromPromise(request(p));
      })
      .subscribe(r => {
        return reaction(response(r));
      });
  };
  subscribe('spot-create', spotCreate, createSpotCreate);
  subscribe('spot-index', spotIndex, createSpotIndex);
  subscribe('stamp-rally-index', stampRallyIndex, createStampRallyIndex);
  subscribe('stamp-rally-show', stampRallyShow, createStampRallyShow);
  subscribe('token-create', tokenCreate, createTokenCreate);
}

