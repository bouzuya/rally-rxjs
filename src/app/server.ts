import run from '../framework/run';

import http from '../executors/http/';

import { routes } from './route/';
import { view } from './view/all';
import app from './app';

export default function main() {
  run(
    app,
    [
      http(view, routes)
    ]
  );
}
