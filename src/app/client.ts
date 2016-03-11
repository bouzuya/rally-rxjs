import run from '../framework/run';

import { init as dom } from '../executors/dom/';
import history from '../executors/history/';
import { init as request } from '../executors/request/';
import state from '../executors/state/';

import { requests } from './requests/';
import { routes } from './route/';
import { view } from './view/app';
import app from './app';

export default function main() {
  run(
    app,
    [
      request({ requests }),
      state(),
      dom({
        render: view,
        root: 'div#app'
      }),
      history(routes)
    ]
  );
}
