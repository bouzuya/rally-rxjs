// RequestAction -> HTTP request -> *Action

import { A, O } from 'b-o-a';

type Request = {
  name: string;
  request: (params: any) => Promise<any>;
  responseToAction: (response: any) => A<any>;
};

type RequestOptions = {
  requests: Request[],
  requestActionType?: string;
};

type RequestMap = { [name: string]: Request; };

const init = (options: RequestOptions) => {
  const { requests, requestActionType } = options;
  const type = requestActionType ? requestActionType : 'request';
  const requestMap: RequestMap = requests.reduce((a, i) => {
    const o: RequestMap = {};
    o[i.name] = i;
    return Object.assign({}, a, o);
  }, <RequestMap>{});

  return {
    handler: (action$: O<A<any>>, options: any) => {
      const { re }: { re: (action: A<any>) => void; } = options;
      return action$.map(action => {
        if (action.type !== type) return action;
        const { name, params }: {
          name: string;
          params: any;
        } = action.data;
        const { request, responseToAction } = requestMap[name];
        request(params).then(response => re(responseToAction(response)));
        return; // return undefined
      })
        .filter(a => !!a)
        .share();
    }
  };
};

export { init, Request };
