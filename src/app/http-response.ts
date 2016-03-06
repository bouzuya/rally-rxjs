import { O, A } from 'b-o-a';

import {
  create as httpResponse
} from '../framework/executors/http/http-response-action';
import {
  from as httpRequest$
} from '../framework/executors/http/http-request-action';
import signInIndexInitializer from './initializers/sign-in-index';
import stampRalliesIndexInitializer from './initializers/stamp-rallies-index';
import stampRalliesShowInitializer from './initializers/stamp-rallies-show';

export default function makeHTTPResponse(action$: O<A<any>>): O<A<any>> {
  return O
    .merge(
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'sign_in#index')
        .map(({ params, http }) => {
          return signInIndexInitializer() // no params
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        }),
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#index')
        .map(({ params, http }) => {
          return stampRalliesIndexInitializer() // no params
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        }),
      httpRequest$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#show')
        .map(({ params, http }) => {
          return stampRalliesShowInitializer(params)
            .then(
              state => ({ state, http }),
              error => ({ error, http })
            );
        })
    )
    .mergeMap((promise: Promise<any>) => O.fromPromise(promise))
    .map(httpResponse);
}
