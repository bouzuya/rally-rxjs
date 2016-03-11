import { A, O } from 'b-o-a';

import { Updater } from '../property-type/updater';

import { Token } from '../property-type/token';
import reset$ from './token/reset';

export default function property(
  state: Token,
  action$: O<A<any>>
): O<Token> {
  return O
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
