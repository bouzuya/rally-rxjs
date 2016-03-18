import * as url from 'url';
import * as fetch from 'node-fetch';

import { StampRally } from '../property-type/stamp-rally';

export default function request({
  token, name
}: any): Promise<StampRally> {
  const urlObj = url.parse('https://api.rallyapp.jp/stamp_rallies/');
  urlObj.query = { view_type: 'admin' };
  return fetch(
    url.format(urlObj),
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token token="' + token + '"',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        display_name: 'stamprally',
        tagline: 'tagline',
        description: 'description',
        display: false,
        open: false,
        display_start_datetime: '2016-01-01T00:00:00Z',
        display_end_datetime: '2016-12-31T00:00:00Z',
        start_datetime: '2016-01-01T00:00:00Z',
        end_datetime: '2016-12-31T00:00:00Z'
      })
    }
  )
  .then((response: any) => response.json())
  .then((stampRally: StampRally) => stampRally);
}
