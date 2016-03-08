import { O, A } from 'b-o-a';

import {
  create as httpResponse
} from '../../executors/http/http-response-action';
import {
  from as httpRequest$
} from '../../executors/http/http-request-action';
import signInIndex from '../http-responses/sign-in-index';
import stampRalliesIndex from '../http-responses/stamp-rallies-index';
import stampRalliesShow from '../http-responses/stamp-rallies-show';

const inits = {
  'sign_in#index': signInIndex,
  'stamp_rallies#index': stampRalliesIndex,
  'stamp_rallies#show': stampRalliesShow
};

export default function makeHTTPResponse(action$: O<A<any>>): O<A<any>> {
  return httpRequest$(action$)
    .map(({ route: { name }, params, http }) => {
      return inits[name](params).then(
        state => ({ state, http }),
        error => ({ error, http })
      );
    })
    .mergeMap((promise: Promise<any>) => O.fromPromise(promise))
    .map(httpResponse);
}
