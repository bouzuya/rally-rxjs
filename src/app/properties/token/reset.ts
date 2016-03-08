import fetch from 'node-fetch';
import { A, O } from 'b-o-a';

import { Updater } from '../../property-types/updater';

import {
  from as responseTokenCreate$
} from '../../actions/response-token-create';
import { Token } from '../../property-types/token';

export default function updater$(
  action$: O<A<any>>
): O<Updater<Token>> {
  return responseTokenCreate$(action$)
    .map(token => (): Token => token);
}
