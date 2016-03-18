import { run } from 'b-o-a';

import { init as app } from './app';
import { init as dom } from 'b-o-a/handlers/dom';
import { init as history } from 'b-o-a/handlers/history';
import { init as request } from 'b-o-a/handlers/request';

import { requests } from './requests/';
import { routes } from './routes/';
import { view } from './views/app';

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
      return app().handler(<any>request$, opts);
    }
  );
}
