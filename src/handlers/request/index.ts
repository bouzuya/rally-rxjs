// RequestAction -> HTTP request -> ResponseAction

import { A, O } from 'b-o-a';

type Request = {
  name: string;
  request: (params: any) => Promise<any>;
  [x: string]: any;
};

type RequestOptions = {
  requests: Request[],
  requestActionType?: string;
  responseActionType?: string;
};

type RequestMap = { [name: string]: Request; };

const init = (options: RequestOptions) => {
  const { requests, requestActionType, responseActionType } = options;
  const requestType = requestActionType ? requestActionType : 'request';
  const responseType = responseActionType ? responseActionType : 'response';
  const requestMap: RequestMap = requests.reduce((a, i) => {
    const o: RequestMap = {};
    o[i.name] = i;
    return Object.assign({}, a, o);
  }, <RequestMap>{});

  return {
    handler: (action$: O<A<any>>, options: any) => {
      const { re }: { re: (action: A<any>) => void; } = options;
      return action$.map(action => {
        if (action.type !== requestType) return action;
        const { name, params }: {
          name: string;
          params: any;
        } = action.data;
        const request = requestMap[name];
        request.request(params).then(response => {
          return re({
            type: responseType,
            data: {
              request,
              response
            }
          });
        });
        return; // return undefined
      })
        .filter(a => !!a)
        .share();
    }
  };
};

export { init, Request };
