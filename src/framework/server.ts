import renderToHTML from 'vdom-to-html';
import { Router, Route } from './router';
import { HTML, Path } from './types';
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

  private init(path: Path): Promise<State> {
    const action = this.router.routes(path);
    const initializer = this.initializers[action.params.name];
    return initializer(action.params.params);
  }

  private request(path: Path): Promise<HTML> {
    return this.init(path)
      .then(state => this.render(state, { e: (): void => null }))
      .then(vtree => renderToHTML(vtree));
  }
}

export { Server };