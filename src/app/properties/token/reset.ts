import fetch from 'node-fetch';
import { A, O } from '../../../framework/o-a';

import { Updater } from '../../models/updater';

import {
  from as responseTokenCreate$
} from '../../actions/response-token-create';
import { Token } from '../../models/token';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Token>> {
  return responseTokenCreate$(action$)
    .map(token => (): Token => token);
}
