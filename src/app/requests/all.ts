import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { Spot } from '../models/spot';

import { create as createSpotIndex } from '../actions/response-spot-index';
import { is as isSpotIndex } from '../actions/request-spot-index';
import spotIndex from '../requests/spot-index';

export default function request(
  action$: Observable<Action<any>>,
  reaction: (action: Action<any>) => void
): void {
  action$
    .filter(isSpotIndex)
    .mergeMap<Spot[]>(({ params }) => Observable.fromPromise(spotIndex(params)))
    .subscribe(spots => reaction(createSpotIndex(spots)));
}

