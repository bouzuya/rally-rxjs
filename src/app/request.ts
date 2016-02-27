import { O, A, Observable } from '../framework/o-a';
import { from as route$ } from '../framework/route-action';

import { State } from './models/state';
import { Token } from './models/token';
import { from as addSpot$ } from './actions/add-spot';
import { from as addStampRally$ } from './actions/add-stamp-rally';
import { create as createRequest } from './actions/request';
import { from as responseSpotCreate$ } from './actions/response-spot-create';
import { from as goToSignIn$ } from './actions/sign-in';

export default function makeRequest(
  action$: O<A<any>>,
  state$: O<State>
): O<A<any>> {
  return Observable
    .merge(
      Observable
        .merge(
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#index')
            .map(() => ({ token, userId }: Token) => {
              return createRequest('stamp-rally-index', { token, userId });
            }),
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#show')
            .map(({ params }) => params['id'])
            .map(stampRallyId => ({ token }: Token) => {
              return createRequest('stamp-rally-show', { token, stampRallyId });
            }),
          route$(action$)
            .filter(({ name }) => name === 'stamp_rallies#show')
            .map(({ params }) => params['id'])
            .map(stampRallyId => ({ token }: Token) => {
              return createRequest('spot-index', { token, stampRallyId });
            })
        )
        .withLatestFrom(state$, (create: any, state: any) => {
          return create(state.token);
        }),
      addSpot$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            stampRallyId: state.stampRally.name,
            name: state.spotForm.name
          };
        })
        .map(params => createRequest('spot-create', params)),
      addStampRally$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            name: state.stampRallyForm.name
          };
        })
        .map(params => createRequest('stamp-rally-create', params)),
      responseSpotCreate$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            token: state.token.token,
            stampRallyId: state.stampRally.name
          };
        })
        .map(params => createRequest('spot-index', params)),
      goToSignIn$(action$)
        .withLatestFrom(state$, (_, state) => {
          return {
            email: state.signIn.email,
            password: state.signIn.password,
          };
        })
        .map(params => createRequest('token-create', params))
  );
}
