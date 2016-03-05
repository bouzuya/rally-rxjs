import { A, O } from 'b-o-a';

import { Updater } from '../../models/updater';

import {
  from as responseStampRallyShow$
} from '../../actions/response-stamp-rally-show';
import { StampRally } from '../../models/stamp-rally';

export default function updater$(
  action$: O<A<any>>
): O<Updater<StampRally>> {
  return responseStampRallyShow$(action$)
    .map(stampRally => (): StampRally => stampRally);
}
