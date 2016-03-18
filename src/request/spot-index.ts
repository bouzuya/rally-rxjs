import * as url from 'url';
import * as fetch from 'node-fetch';

import { Spot } from '../property-type/spot';

export default function request({ token, stampRallyId }: any): Promise<Spot[]> {
  const urlObj = url.parse(
    'https://api.rallyapp.jp/stamp_rallies/' + stampRallyId + '/spots'
  );
  urlObj.query = { view_type: 'admin' };
  return fetch(
    url.format(urlObj),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token token="' + token + '"',
        'Content-Type': 'application/json'
      }
    }
  )
  .then((response: any) => response.json())
  .then(({ spots }) => spots);
}
