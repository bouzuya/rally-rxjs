import { run } from 'b-o-a';

import { init as app } from './app';
import { init as dom } from 'boajs-handler-dom';
import { init as history } from 'boajs-handler-history';
import { init as request } from 'boajs-handler-request';

import { requests } from './requests/';
import { routes } from './routes/';
import { view } from './view/app';

export default function main() {
  run(
    (action$, options) => {
      // TODO: Argument of type 'Observable<{ type: string; data?: any; }>
      // is not assignable to parameter of type
      // 'Observable<{ type: string; data?: any }>'.
      // Property 'source' is protected but type 'Observable<T>'
      // is not a class derived from 'Observable<T>'.
      const state = (<any>window).INITIAL_STATE;
      const opts = Object.assign({}, options, { state });
      const act$ = action$.do(console.log.bind(console)).share();
      const dom$ = dom({
        render: view,
        root: 'div#app'
      }).handler(<any>act$, opts);
      const history$ = history({
        routes
      }).handler(<any>dom$, opts);
      const request$ = request({
        requests
      }).handler(<any>history$, opts);
      return app().handler(request$, opts);
    }
  );
}
