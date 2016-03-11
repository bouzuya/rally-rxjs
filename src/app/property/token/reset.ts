import fetch from 'node-fetch';
import { A, O } from 'b-o-a';

import { Updater } from '../../property-type/updater';

import {
  from as responseTokenCreate$
} from '../../action/response-token-create';
import { Token } from '../../property-type/token';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Token>> {
  return responseTokenCreate$(action$)
    .map(token => (): Token => token);
}
