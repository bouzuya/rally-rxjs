// HTTP request -> HttpRequestAction
// HTTPResponseAction -> HTTP response

import { HTML } from 'boajs-vdom';
import { A, O } from 'b-o-a';
import { init as makeRouter, Route } from 'boajs-router';
import * as express from 'express';

const runServer = (
  dir: string,
  middlewares: any[],
  port: number,
  proc: (request: any, response: any) => void
) => {
  const app = express();
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
  app.use(express.static(dir)); // TODO: if dir is null
  app.use(proc);
  app.listen(port); // TODO: if port is null
};

const makeRender = HTML.init;

type HTTPOptions = {
  dir: string;
  middlewares: any[];
  port: number;
  render: (state: any, options: any) => any;
  routes: Route[];
  httpRequestActionType?: string;
  httpResponseActionType?: string;
};

const init = (options: HTTPOptions) => {
  const {
    dir,
    middlewares,
    port,
    render,
    routes,
    httpRequestActionType,
    httpResponseActionType
  } = options;
  const http = makeRouter(routes);
  const httpRequestType = httpRequestActionType
    ? httpRequestActionType
    : 'http-request';
  const httpResponseType = httpResponseActionType
    ? httpResponseActionType
    : 'http-response';
  return {
    handler: (action$: O<A<any>>, options: any) => {
      const { re } = options;
      let renderToHTML = makeRender();
      return O.merge(
        action$.first().do(() => {
          const proc = (request: any, response: any) => {
            const { route, params } = http(request.path);
            re({
              type: httpRequestType,
              data: { route, params, http: { request, response } }
            });
          };
          runServer(dir, middlewares, port, proc);
        }),
        action$.map(action => {
          if (action.type !== httpResponseType) return action;
          const { error, state, http: { response } } = action.data;
          if (error && error.message === 'redirect') {
            const { status, path } = error;
            response.redirect(status, path);
          } else if (error) {
            const { status, path } = error;
            response.send(error.message);
          } else {
            const vtree = render(state, { e: (): void => null });
            const rendered = renderToHTML(vtree);
            const { result: html } = rendered;
            renderToHTML = rendered.render;
            response.send(html);
          }
          return; // return undefined
        })
      )
        .filter(a => !!a)
        .share();
    }
  };
};

export { init };
