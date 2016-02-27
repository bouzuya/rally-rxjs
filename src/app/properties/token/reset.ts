import fetch from 'node-fetch';
import { Observable } from 'rxjs';
import { Action } from '../../../framework/action';

import { Updater } from '../../models/updater';

import {
  from as responseTokenCreate$
} from '../../actions/response-token-create';
import { create } from '../../actions/success-sign-in';
import { Token } from '../../models/token';

export default function updater$(
  action$: Observable<Action<any>>
): Observable<Updater<Token>> {
  return responseTokenCreate$(action$)
    .map(token => (): Token => token);
}
