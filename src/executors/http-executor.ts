import renderToHTML from 'vdom-to-html';
import { A } from 'b-o-a';
import { Executor } from '../framework/executor';
import { VTree } from '../framework/view';
import { Route } from '../framework/route';
import { Router } from '../framework/router';
import runServer from './http/express-server';
import { create as httpRequest } from './http/http-request-action';
import { is as isHTTPResponse } from './http/http-response-action';

export default function init(
  view: (state: any, options: any) => VTree,
  routes: Route[]
): Executor {
  const after = (context: any): any => {
    const { re, http } = context;
    const proc = (request: any, response: any) => {
      const { route, params } = http.routes(request.path);
      re(httpRequest({ route, params, http: { request, response } }));
    };
    runServer(proc);
  };

  const before = (context: any): any => {
    const router = new Router(routes);
    return Object.assign({}, context, { http: router });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (!isHTTPResponse(action)) return action;
    const { error, state, http: { response } } = action.data;
    if (error && error.message === 'redirect') {
      const { status, path } = error;
      response.redirect(status, path);
    } else if (error) {
      const { status, path } = error;
      response.send(error.message);
    } else {
      const vtree = view(state, { e: (): void => null });
      const html = renderToHTML(vtree);
      response.send(html);
    }
    return { type: 'noop' };
  };

  return { after, before, execute };
}
