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

export default function makeHTTPResponse(action$: O<A<any>>): O<A<any>> {
  return O
    .merge(
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'sign_in#index')
        .map(({ params, http }) => {
          return signInIndex(params)
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        }),
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#index')
        .map(({ params, http }) => {
          return stampRalliesIndex(params)
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        }),
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#show')
        .map(({ params, http }) => {
          return stampRalliesShow(params)
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        })
    )
    .mergeMap((promise: Promise<any>) => O.fromPromise(promise))
    .map(httpResponse);
}
