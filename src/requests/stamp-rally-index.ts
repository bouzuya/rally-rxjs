import * as url from 'url';
import * as fetch from 'node-fetch'

import { StampRally } from '../types/stamp-rally';

export default function request({
  token, userId
}: any): Promise<StampRally[]> {
  const urlObj = url.parse(
    'https://api.rallyapp.jp/users/' + userId + '/stamp_rallies'
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
  .then(({ stampRallies }) => stampRallies);
}
