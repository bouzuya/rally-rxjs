import { Initializer, InitializerParameters } from '../framework/initializer';
import { Server } from '../framework/server';
import { VTree } from '../framework/view';

import { routes } from './configs/routes';
import signInIndexInitializer from './initializers/sign-in-index';
import stampRalliesIndexInitializer from './initializers/stamp-rallies-index';
import { State } from './models/state';
import { view } from './view';

const initializers: { [name: string]: Initializer<State> } = {
  'sign_in#index': signInIndexInitializer,
  'stamp_rallies#index': stampRalliesIndexInitializer
};

const render = (state: State): VTree => {
  return view(state, true);
};

export default function main() {
  const server = new Server(initializers, render, routes);
  server.run();
}
