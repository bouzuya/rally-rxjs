// HTTP request -> HttpRequestAction
// HTTPResponseAction -> HTTP response

import { A, O, Handler } from 'boa-core';
import { create, HTML as HTML2, VDOM } from 'boa-vdom';
import { init as makeRouter, Route } from 'boa-router';
import * as express from 'express';

type ExpressHandler = (request: any, response: any) => void;

type ServerOptions = {
  dir: string;
  middlewares: any[];
  port: number;
};

type HTTPOptions = {
  dir: string;
  middlewares: any[];
  port: number;
  render: (state: any, options: any) => any;
  inits: any[];
  httpRequestActionType?: string;
  httpResponseActionType?: string;
};

export interface InitResponse {
  handler: Handler;
}

const makeInit = (inits: any) => {
  const router = makeRouter(inits);
  return (path: string): Promise<any> => {
    const { route: { init }, params } = router(path);
    return Promise.resolve().then(() => init(params));
  };
};

const makeHTMLRender = (view: (state: any, options: any) => VDOM) => {
  let render = HTML2.init(); // render is mutable
  return (state: any): string => {
    const vdom = view(state, { create, e: (): void => null });
    const rendered = render(vdom);
    render = rendered.render; // update render
    return rendered.result;
  };
};

const makeExpressHandler = (init: any, render: any): ExpressHandler => {
  return (request: any, response: any) => {
    init(request.path)
      .then(state => response.send(render(state)))
      .catch(error => {
        if (error && error.message === 'redirect') {
          const { status, path } = error;
          response.redirect(status, path);
        } else if (error) {
          const { status, path } = error;
          response.send(error.message);
        }
      });
  };
};

const runServer = (
  serverOptions: { dir: string; middlewares: any[]; port: number },
  expressHandler: (request: any, response: any) => void
) => {
  const { dir, middlewares, port } = serverOptions;
  const app = express();
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
  app.use(express.static(dir)); // TODO: if dir is null
  app.use(expressHandler);
  app.listen(port); // TODO: if port is null
};

const makeHandler = (serverOptions: ServerOptions, expressHandler): Handler => {
  return (action$: O<A<any>>, _: any): O<A<any>> => {
    return O.merge(
      action$,
      action$.first().map(() => {
        runServer(serverOptions, expressHandler);
        return; // return undefined
      })
    )
      .filter(a => !!a) // remove undefined
      .share();
  };
};

const init = (options: HTTPOptions): InitResponse => {
  const {
    dir,
    middlewares,
    port,
    render,
    inits
  } = options;
  const serverOptions = { dir, middlewares, port };
  const expressHandler = makeExpressHandler(
    makeInit(inits),
    makeHTMLRender(render)
  );
  const handler = makeHandler(serverOptions, expressHandler);
  return { handler };
};

export { init };
