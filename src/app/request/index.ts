import { Request } from 'boajs-handler-request';

import spotCreate from '../request/spot-create';
import spotIndex from '../request/spot-index';
import stampRallyCreate from '../request/stamp-rally-create';
import stampRallyIndex from '../request/stamp-rally-index';
import stampRallyShow from '../request/stamp-rally-show';
import tokenCreate from '../request/token-create';

const requests: Request[] = [
  { name: 'spot-create', request: spotCreate },
  { name: 'spot-index', request: spotIndex },
  { name: 'stamp-rally-create', request: stampRallyCreate },
  { name: 'stamp-rally-index', request: stampRallyIndex },
  { name: 'stamp-rally-show', request: stampRallyShow },
  { name: 'token-create', request: tokenCreate }
];

export { requests };
