import * as url from 'url';
import fetch from 'node-fetch'

import { Token } from '../models/token';

export default function request({
  email, password
}): Promise<Token> {
  return fetch(
    'https://api.rallyapp.jp/tokens',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    }
  )
  .then((response: any) => response.json())
  .then((json: any) => {
    return { token: json.token, userId: json.userId };
  });
}
