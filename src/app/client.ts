import run from '../framework/run';

import { init as domInit } from '../handlers/dom/';
import { init as historyInit } from '../handlers/history/';
import { init as request } from '../executors/request/';
import state from '../executors/state/';

import { requests } from './request/';
import { routes } from './route/';
import { view } from './view/app';
import app from './app';

export default function main() {
  run(
    (action$, options) => {
      // dom handler
      const {
        handler: domHandler,
        options: domOptions
      } = domInit({
        render: view,
        root: 'div#app'
      }, options);
      const dom$ = domHandler(action$, domOptions);

      // history handler
      const {
        handler: historyHandler,
        options: historyOptions,
        start: historyStart
      } = historyInit({ routes }, domOptions);
      const history$ = historyHandler(dom$.filter(a => !!a), options);

      return app(history$.filter(a => !!a), historyOptions);
    },
    [
      request({ requests }),
      state()
    ]
  );
}
