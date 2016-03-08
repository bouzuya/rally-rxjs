import { A, O } from 'b-o-a';

import { State } from '../property-types/state';

import currentPage$ from '../properties/current-page';
import signIn$ from '../properties/sign-in';
import spots$ from '../properties/spots';
import spotForm$ from '../properties/spot-form';
import stampRallies$ from '../properties/stamp-rallies';
import stampRally$ from '../properties/stamp-rally';
import stampRallyForm$ from '../properties/stamp-rally-form';
import token$ from '../properties/token';

const $ = (action$: O<A<any>>, state: State): O<State> => {
  return O
    .combineLatest(
      currentPage$(state.currentPage, action$),
      signIn$(state.signIn, action$),
      token$(state.token, action$),
      spots$(state.spots, action$),
      spotForm$(state.spotForm, action$),
      stampRallies$(state.stampRallies, action$),
      stampRally$(state.stampRally, action$),
      stampRallyForm$(state.stampRallyForm, action$),
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
        return Object.assign({}, state, {
          currentPage,
          signIn,
          token,
          spots,
          spotForm,
          stampRallies,
          stampRally,
          stampRallyForm
        });
      }
    )
    .do(console.log.bind(console)) // logger for state
    .share();
};

export { $ };
