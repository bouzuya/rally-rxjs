import { A, O } from 'b-o-a';

import {
  from as reset$
} from '../actions/props/token/reset';

import { Token } from '../types/token';
import { Updater } from '../types/updater';

export default function property(
  state: Token,
  action$: O<A<any>>
): O<Token> {
  return O
    .of(state)
    .merge(reset$(action$).map(token => () => token))
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
