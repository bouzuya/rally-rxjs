import { Request } from 'boajs-handler-request';

import spotCreate from '../requests/spot-create';
import spotIndex from '../requests/spot-index';
import stampRallyCreate from '../requests/stamp-rally-create';
import stampRallyIndex from '../requests/stamp-rally-index';
import stampRallyShow from '../requests/stamp-rally-show';
import tokenCreate from '../requests/token-create';

const requests: Request[] = [
  { name: 'spot-create', request: spotCreate },
  { name: 'spot-index', request: spotIndex },
  { name: 'stamp-rally-create', request: stampRallyCreate },
  { name: 'stamp-rally-index', request: stampRallyIndex },
  { name: 'stamp-rally-show', request: stampRallyShow },
  { name: 'token-create', request: tokenCreate }
];

export { requests };
