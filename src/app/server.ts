import { Initializer, InitializerParameters } from '../framework/initializer';
import { Server } from '../framework/server';
import { VTree } from '../framework/view';

import { routes } from './configs/routes';
import signInIndexInitializer from './initializers/sign-in-index';
import stampRalliesIndexInitializer from './initializers/stamp-rallies-index';
import stampRalliesShowInitializer from './initializers/stamp-rallies-show';
import { State } from './models/state';
import render from './views/all';

const initializers: { [name: string]: Initializer<State> } = {
  'sign_in#index': signInIndexInitializer,
  'stamp_rallies#index': stampRalliesIndexInitializer,
  'stamp_rallies#show': stampRalliesShowInitializer
};

export default function main() {
  const server = new Server(initializers, render, routes);
  server.run();
}
