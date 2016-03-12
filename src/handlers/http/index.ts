// HTTP request -> HttpRequestAction
// HTTPResponseAction -> HTTP response

import * as renderToHTML from 'vdom-to-html';
import { A, O } from 'b-o-a';
import { init as makeRouter, Route } from 'boajs-router';
import runServer from './express-server';

type HTTPOptions = {
  render: (state: any, options: any) => any;
  routes: Route[];
  httpRequestActionType?: string;
  httpResponseActionType?: string;
};

const init = (options: HTTPOptions) => {
  const {
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
      return O.merge(
        action$.first().do(() => {
          const proc = (request: any, response: any) => {
            const { route, params } = http(request.path);
            re({
              type: httpRequestType,
              data: { route, params, http: { request, response } }
            });
          };
          runServer(proc);
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
            const html = renderToHTML(vtree);
            response.send(html);
          }
          return; // return undefined
        })
      );
    }
  };
};

export { init };
