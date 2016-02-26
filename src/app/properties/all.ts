import { Observable } from 'rxjs';

import { Action } from '../models/action';
import { State } from '../models/state';

import currentPage$ from '../properties/current-page';
import signIn$ from '../properties/sign-in';
import spots$ from '../properties/spots';
import spotForm$ from '../properties/spot-form';
import stampRallies$ from '../properties/stamp-rallies';
import stampRally$ from '../properties/stamp-rally';
import stampRallyForm$ from '../properties/stamp-rally-form';
import token$ from '../properties/token';

export default function state(
  state: State,
  action$: Observable<Action<any>>,
  next: (action: Action<any>) => void
): Observable<State> {
  return Observable
    .combineLatest(
      currentPage$(state.currentPage, action$),
      signIn$(state.signIn, action$),
      token$(state.token, action$),
      spots$(state.spots, action$),
      spotForm$(state.spotForm, action$),
      stampRallies$(state.stampRallies, action$, next),
      stampRally$(state.stampRally, action$, next),
      stampRallyForm$(state.stampRallyForm, action$, next),
      (
        currentPage,
        signIn,
        token,
        spots,
        spotForm,
        stampRallies,
        stampRally,
        stampRallyForm
      ): State => {
        return {
          currentPage,
          signIn,
          token,
          spots,
          spotForm,
          stampRallies,
          stampRally,
          stampRallyForm
        };
      }
    )
    .share();
}
