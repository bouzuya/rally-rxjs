import { A, O } from 'b-o-a';

import { Updater } from '../../property-types/updater';

import {
  from as responseStampRallyShow$
} from '../../actions/response-stamp-rally-show';
import { StampRally } from '../../property-types/stamp-rally';

export default function updater$(
  action$: O<A<any>>
): O<Updater<StampRally>> {
  return responseStampRallyShow$(action$)
    .map(stampRally => (): StampRally => stampRally);
}
