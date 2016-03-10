// RequestAction -> HTTP request -> *Action

import { A, O } from 'b-o-a';
import { Executor } from '../../framework/executor';

// import { from as request$ } from './request-action';

type Request = {
  name: string;
  request: (params: any) => Promise<any>;
  responseToAction: (response: any) => A<any>;
};

type RequestMap = { [name: string]: Request; };

// RequestAction to ResponseAction
// const $ = (action$: O<A<any>>, options: any): O<A<any>> => {
//   const { requests }: { requests: Request[] } = options;
//   const map: RequestMap = requests.reduce((a, i) => {
//     const o: RequestMap = {};
//     o[i.name] = i;
//     return Object.assign({}, a, o);
//   }, <RequestMap>{});
//   return request$(action$).mergeMap(({ path, params }) => {
//     const { request, responseToAction } = map[path];
//     return O.fromPromise(request(params)).map(responseToAction);
//   });
// };

const init = (options: any): Executor => {
  const { requests, requestActionType }: {
    requests: Request[],
    requestActionType: string;
  } = options;
  const type = requestActionType ? requestActionType : 'request';
  const requestMap: RequestMap = requests.reduce((a, i) => {
    const o: RequestMap = {};
    o[i.name] = i;
    return Object.assign({}, a, o);
  }, <RequestMap>{});

  const after = (context: any): any => context;

  const before = (context: any): any => {
    const request = { requestMap };
    return Object.assign({}, context, { request });
  };

  const execute = (context: any) => (action: A<any>) => {
    if (action.type !== type) return action;
    const { request: { requestMap }, re }: {
      request: { requestMap: RequestMap };
      re: (action: A<any>) => void;
    } = context;
    const { path, params }: {
      path: string;
      params: any;
    } = action.data;
    const { request, responseToAction } = requestMap[path];
    request(params).then(response => re(responseToAction(response)));
    return; // return undefined
  };

  return { after, before, execute };
}

export { init, Request };
