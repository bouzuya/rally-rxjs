import run from '../framework/run';

import dom from '../framework/executors/dom-executor';
import history from '../framework/executors/history-executor';
import state from '../framework/executors/state-executor';

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
