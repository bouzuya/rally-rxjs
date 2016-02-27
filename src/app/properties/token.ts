import { A, O, Observable } from '../../framework/o-a';

import { Updater } from '../models/updater';

import { Token } from '../models/token';
import reset$ from './token/reset';

export default function property(
  state: Token,
  action$: O<A<any>>
): O<Token> {
  return Observable
    .of(state)
    .merge(
      reset$(action$)
    )
    .scan((state: Token, updater: Updater<Token>) => {
      return updater(state);
    });
};
