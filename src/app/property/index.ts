import { A, O } from 'b-o-a';

import { State } from '../property-type/state';

import currentPage$ from '../property/current-page';
import signIn$ from '../property/sign-in';
import spots$ from '../property/spots';
import spotForm$ from '../property/spot-form';
import stampRallies$ from '../property/stamp-rallies';
import stampRally$ from '../property/stamp-rally';
import stampRallyForm$ from '../property/stamp-rally-form';
import token$ from '../property/token';

const getDefaultState = (): State => {
  return {
    googleApiKey: process.env.GOOGLE_API_KEY,
    currentPage: 'sign_in#index',
    signIn: {
      email: null,
      password: null
    },
    spots: [],
    spotForm: {
      name: null
    },
    stampRallies: [],
    stampRally: null,
    stampRallyForm: {
      name: null
    },
    token: {
      token: null,
      userId: null
    }
  };
};

const $ = (action$: O<A<any>>, state: State): O<State> => {
  const s = (state ? state : getDefaultState());
  return O
    .combineLatest(
      currentPage$(s.currentPage, action$),
      signIn$(s.signIn, action$),
      token$(s.token, action$),
      spots$(s.spots, action$),
      spotForm$(s.spotForm, action$),
      stampRallies$(s.stampRallies, action$),
      stampRally$(s.stampRally, action$),
      stampRallyForm$(s.stampRallyForm, action$),
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
        return Object.assign({}, s, {
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
