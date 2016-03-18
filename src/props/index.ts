import { A, O } from 'b-o-a';

import { State } from '../types/state';

import currentPage$ from '../props/current-page';
import signIn$ from '../props/sign-in';
import spots$ from '../props/spots';
import spotForm$ from '../props/spot-form';
import stampRallies$ from '../props/stamp-rallies';
import stampRally$ from '../props/stamp-rally';
import stampRallyForm$ from '../props/stamp-rally-form';
import token$ from '../props/token';

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
