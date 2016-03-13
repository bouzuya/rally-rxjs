import { run } from 'b-o-a';

import { init as app } from './app';
import { init as http } from '../handlers/http/';

import { routes } from './route/';
import { view } from './view/all';

export default function main() {
  run(
    (action$, options) => {
      const http$ = http({
        render: view,
        routes
      }).handler(action$, options);
      return app().handler(http$.filter(a => !!a), options);
    }
  );
}
