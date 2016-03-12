import run from '../framework/run';

import { init as domInit } from '../handlers/dom/';
import { init as history } from '../executors/history/';
import { init as request } from '../executors/request/';
import state from '../executors/state/';

import { requests } from './request/';
import { routes } from './route/';
import { view } from './view/app';
import app from './app';

export default function main() {
  run(
    (action$, options) => {
      const {
        handler: domHandler,
        options: domOptions
      } = domInit({
        render: view,
        root: 'div#app'
      }, options);
      const dom$ = domHandler(action$, options);
      return app(dom$.filter(a => !!a), domOptions);
    },
    [
      request({ requests }),
      state(),
      history(routes)
    ]
  );
}
