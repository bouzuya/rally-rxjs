import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Spot } from '../models/spot';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

import { create as createSpotIndex } from '../actions/response-spot-index';
import { is } from '../actions/request';
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

  request$
    .filter(({ params: { path } }) => path === 'spot-index')
    .mergeMap<Spot[]>(({ params: { params } }) => {
      return Observable.fromPromise(spotIndex(params));
    })
    .subscribe(response => {
      return reaction(createSpotIndex(response));
    });

  request$
    .filter(({ params: { path } }) => path === 'stamp-rally-index')
    .mergeMap<StampRally[]>(({ params: { params } }) => {
      return Observable.fromPromise(stampRallyIndex(params));
    })
    .subscribe(response => {
      return reaction(createStampRallyIndex(response));
    });

  request$
    .filter(({ params: { path } }) => path === 'stamp-rally-show')
    .mergeMap<StampRally>(({ params: { params } }) => {
      return Observable.fromPromise(stampRallyShow(params));
    })
    .subscribe(response => {
      return reaction(createStampRallyShow(response));
    });

  request$
    .filter(({ params: { path } }) => path === 'token-create')
    .mergeMap<Token>(({ params: { params } }) => {
      return Observable.fromPromise(tokenCreate(params));
    })
    .subscribe(response => {
      return reaction(createTokenCreate(response));
    });
}

