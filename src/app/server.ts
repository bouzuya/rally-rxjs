import { run } from 'b-o-a';

import { init as http } from '../handlers/http/';

import { routes } from './route/';
import { view } from './view/all';
import app from './app';

export default function main() {
  run(
    (action$, options) => {
      const http$ = http({
        render: view,
        routes
      }).handler(action$, options);
      return app(http$.filter(a => !!a), options);
    }
  );
}
