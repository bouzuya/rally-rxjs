import { A, O, Observable } from '../framework/o-a';
import { Client } from '../framework/client';

import { routes } from './configs/routes';
import { State } from './models/state';
import render from './views/app';

import makeGoTo from './go-to';
import makeOther from './other';
import makeRender from './render';
import makeRequest from './request';
import makeResponse from './response';
import makeState from './properties/all';
import domAction$ from './dom-action';

const app = (
  action$: O<A<any>>,
  options: {
    state: State
  }
): O<A<any>> => {
  const { state } = options;
  const state$ = makeState(action$, state);
  return Observable
    .merge(
      makeGoTo(action$),
      makeOther(action$),
      makeRender(state$),
      makeRequest(action$, state$),
      makeResponse(action$)
    )
    .share();
};

export default function main() {
  const client = new Client(
    'div#app', render, app, routes, domAction$
  );
  client.run();
}
