import run from '../framework/run';

import http from '../executors/http/';

import { routes } from './routes/all';
import view from './views/all';
import app from './app';

export default function main() {
  run(
    app,
    [
      http(view, routes)
    ]
  );
}
