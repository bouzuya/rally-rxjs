import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Spot } from '../models/spot';
import { StampRally } from '../models/stamp-rally';
import { Token } from '../models/token';

import { create as createSpotIndex } from '../actions/response-spot-index';
import { is as isSpotIndex } from '../actions/request-spot-index';
import spotIndex from '../requests/spot-index';

import {
  create as createStampRallyIndex
} from '../actions/response-stamp-rally-index';
import { is as isStampRallyIndex } from '../actions/request-stamp-rally-index';
import stampRallyIndex from '../requests/stamp-rally-index';

import {
  create as createStampRallyShow
} from '../actions/response-stamp-rally-show';
import { is as isStampRallyShow } from '../actions/request-stamp-rally-show';
import stampRallyShow from '../requests/stamp-rally-show';

import {
  create as createTokenCreate
} from '../actions/response-token-create';
import { is as isTokenCreate } from '../actions/request-token-create';
import tokenCreate from '../requests/token-create';

export default function request(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): void {
  action$
    .filter(isSpotIndex)
    .mergeMap<Spot[]>(({ params }) => {
      return Observable.fromPromise(spotIndex(params));
    })
    .subscribe(response => {
      return reaction(createSpotIndex(response));
    });

  action$
    .filter(isStampRallyIndex)
    .mergeMap<StampRally[]>(({ params }) => {
      return Observable.fromPromise(stampRallyIndex(params));
    })
    .subscribe(response => {
      return reaction(createStampRallyIndex(response));
    });

  action$
    .filter(isStampRallyShow)
    .mergeMap<StampRally>(({ params }) => {
      return Observable.fromPromise(stampRallyShow(params));
    })
    .subscribe(response => {
      return reaction(createStampRallyShow(response));
    });

  action$
    .filter(isTokenCreate)
    .mergeMap<Token>(({ params }) => {
      return Observable.fromPromise(tokenCreate(params));
    })
    .subscribe(response => {
      return reaction(createTokenCreate(response));
    });
}

