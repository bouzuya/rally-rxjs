import { A, O } from 'b-o-a';

import { Updater } from '../../models/updater';

import {
  from as responseStampRallyIndex$
} from '../../actions/response-stamp-rally-index';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: O<A<any>>
): O<Updater<StampRally[]>> {
  return responseStampRallyIndex$(action$)
    .map(stampRallies => (): StampRally[] => stampRallies);
}
