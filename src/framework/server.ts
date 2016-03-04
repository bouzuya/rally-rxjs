import renderToHTML from 'vdom-to-html';
import { Route } from './route';
import { Router } from './router';
import { Initializer } from './initializer';
import run from './express-server';
import { VTree } from './view';

class Server<State> {
  private initializers: { [actionName: string]: Initializer<State> };
  private render: (state: State, options: any) => VTree;
  private router: Router;

  constructor(
    initializers: { [actionName: string]: Initializer<State> },
    render: (state: State, options: any) => VTree,
    routes: Route[]
  ) {
    this.initializers = initializers;
    this.render = render;
    this.router = new Router(routes);
  }

  run(): void {
    // FIXME:
    run(<any> this);
  }

  private init(path: string): Promise<State> {
    const action = this.router.routes(path);
    const initializer = this.initializers[action.data.name];
    return initializer(action.data.params);
  }

  private request(path: string): Promise<string> {
    return this.init(path)
      .then(state => this.render(state, { e: (): void => null }))
      .then(vtree => renderToHTML(vtree));
  }
}

export { Server };