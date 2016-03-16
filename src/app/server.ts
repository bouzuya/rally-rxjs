import { run } from 'b-o-a';

import { init as app } from './app';
import { init as http } from '../handlers/http/';

import { routes } from './route/';
import { view } from './view/all';

export default function main() {
  run(
    (action$, options) => {
      const act$ = action$.do(console.log.bind(console)).share();
      const http$ = http({
        render: view,
        routes
      }).handler(act$, options);
      return app().handler(http$, options);
    }
  );
}
