import { A, O } from 'b-o-a';

import { Updater } from '../../property-type/updater';

import {
  from as responseStampRallyShow$
} from '../../action/response-stamp-rally-show';
import { StampRally } from '../../property-type/stamp-rally';

export default function updater$(
  action$: O<A<any>>
): O<Updater<StampRally>> {
  return responseStampRallyShow$(action$)
    .map(stampRally => (): StampRally => stampRally);
}
