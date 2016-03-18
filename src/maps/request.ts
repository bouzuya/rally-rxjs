import { O, A } from 'b-o-a';
import { from as route$ } from '../actions/route';

import { State } from '../types/state';
import { Token } from '../types/token';
import { from as addSpot$ } from '../actions/views/add-spot';
import { from as addStampRally$ } from '../actions/views/add-stamp-rally';
import { from as goToSignIn$ } from '../actions/views/sign-in';
import { from as responseSpotCreate$ } from '../actions/response-spot-create';

const $ = (action$: O<A<any>>, state$: O<State>, options: any): O<A<any>> => {
  const { type }: { type: string; } = options;
  const request = (name: string, params: any): A<any> => {
    return { type, data: { name, params } };
  };
  return O.merge(
    O.merge(
      route$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#index')
        .map(() => ({ token, userId }: Token) => {
          return request('stamp-rally-index', { token, userId });
        }),
      route$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#show')
        .map(({ params }) => params['id'])
        .map(stampRallyId => ({ token }: Token) => {
          return request('stamp-rally-show', { token, stampRallyId });
        }),
      route$(action$)
        .filter(({ route: { name } }) => name === 'stamp_rallies#show')
        .map(({ params }) => params['id'])
        .map(stampRallyId => ({ token }: Token) => {
          return request('spot-index', { token, stampRallyId });
        })
      )
      .withLatestFrom(state$, (create: any, state: any) => {
        return create(state.token);
      }),
    addSpot$(action$)
      .withLatestFrom<State, any>(state$, (_, state) => {
        return {
          token: state.token.token,
          stampRallyId: state.stampRally.name,
          name: state.spotForm.name
        };
      })
      .map(params => request('spot-create', params)),
    addStampRally$(action$)
      .withLatestFrom<State, any>(state$, (_, state) => {
        return {
          token: state.token.token,
          name: state.stampRallyForm.name
        };
      })
      .map(params => request('stamp-rally-create', params)),
    responseSpotCreate$(action$)
      .withLatestFrom<State, any>(state$, (_, state) => {
        return {
          token: state.token.token,
          stampRallyId: state.stampRally.name
        };
      })
      .map(params => request('spot-index', params)),
    goToSignIn$(action$)
      .withLatestFrom<State, any>(state$, (_, state) => {
        return {
          email: state.signIn.email,
          password: state.signIn.password,
        };
      })
      .map(params => request('token-create', params))
    );
};

export { $ };
