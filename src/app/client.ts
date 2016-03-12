import { run } from 'b-o-a';

import { init as dom } from 'boajs-handler-dom';
import { init as history } from '../handlers/history/';
import { init as request } from '../handlers/request/';

import { requests } from './request/';
import { routes } from './route/';
import { view } from './view/app';
import app from './app';

export default function main() {
  run(
    (action$, options) => {
      const state = (<any>window).INITIAL_STATE;
      const opts = Object.assign({}, options, { state })
      const dom$ = dom({
        render: view,
        root: 'div#app'
      }).handler(action$, opts);
      const history$ = history({
        routes
      }).handler(dom$, opts);
      const request$ = request({
        requests
      }).handler(history$.filter(a => !!a), opts);
      return app(request$.filter(a => !!a), opts);
    }
  );
}
