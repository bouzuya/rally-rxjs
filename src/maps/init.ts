import { O, A } from 'b-o-a';

import rootIndex from '../inits/root-index';
import signInIndex from '../inits/sign-in-index';
import stampRalliesIndex from '../inits/stamp-rallies-index';
import stampRalliesShow from '../inits/stamp-rallies-show';
import { State } from '../types/state';

const inits: { [k:string]: (params: any) => Promise<any>; } = {
  'root#index': rootIndex,
  'sign_in#index': signInIndex,
  'stamp_rallies#index': stampRalliesIndex,
  'stamp_rallies#show': stampRalliesShow
};

const $ = (action$: O<A<any>>, _: O<State>): O<A<any>> => {
  return action$
    .filter(action => action.type === 'http-request') // TODO: specified by app.
    .map(({ data }) => data)
    .map(({ route: { name }, params, http }) => {
      return inits[name](params).then(
        state => ({ state, http }),
        error => ({ error, http })
      );
    })
    .mergeMap((promise: Promise<any>) => O.fromPromise(promise))
    .map(data => ({ type: 'http-response', data }));
};

export { $ };
