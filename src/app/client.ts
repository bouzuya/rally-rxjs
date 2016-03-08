import run from '../framework/run';

import dom from '../executors/dom/';
import history from '../executors/history/';
import state from '../executors/state/';

import { routes } from './routes/all';
import view from './views/app';
import app from './app';

export default function main() {
  run(
    app,
    [
      state(),
      dom('div#app', view),
      history(routes)
    ]
  );
}
