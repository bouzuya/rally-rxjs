import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Spot } from '../models/spot';
import { StampRally } from '../models/stamp-rally';

import { create as createSpotIndex } from '../actions/response-spot-index';
import { is as isSpotIndex } from '../actions/request-spot-index';
import spotIndex from '../requests/spot-index';

import {
  create as createStampRallyIndex
} from '../actions/response-stamp-rally-index';
import { is as isStampRallyIndex } from '../actions/request-stamp-rally-index';
import stampRallyIndex from '../requests/stamp-rally-index';

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
}

