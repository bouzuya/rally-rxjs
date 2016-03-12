// HTTP request -> HttpRequestAction
// HTTPResponseAction -> HTTP response

import * as renderToHTML from 'vdom-to-html';
import { A } from 'b-o-a';
import { Executor } from '../../framework/executor';
import { VTree } from '../../framework/view';
import { init as makeRouter, Route } from 'boajs-router';
import runServer from './express-server';
import { create as httpRequest } from './http-request-action';
import { is as isHTTPResponse } from './http-response-action';

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
    return Object.assign({}, context, { http: makeRouter(routes) });
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
    return; // return undefined
  };

  return { after, before, execute };
}
