import { run } from 'b-o-a';

import { init as domInit } from '../handlers/dom/';
import { init as historyInit } from '../handlers/history/';
import { init as requestInit } from '../handlers/request/';
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
      const history$ = historyHandler(dom$.filter(a => !!a), historyOptions);
      historyStart();

      // request handler
      const {
        handler: requestHandler,
        options: requestOptions
      } = requestInit({ requests }, historyOptions);
      const request$ = requestHandler(
        history$.filter(a => !!a), requestOptions
      );

      const state = (<any>window).INITIAL_STATE;
      return app(
        request$.filter(a => !!a),
        Object.assign({}, requestOptions, { state })
      );
    }
  );
}
