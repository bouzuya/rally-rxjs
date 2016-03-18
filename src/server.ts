import { run } from 'b-o-a';

import { init as app } from './app';
import { init as http } from 'b-o-a/handlers/init';

import { routes } from './routes/';
import { view } from './views/all';

export default function main() {
  run(
    (action$, options) => {
      const act$ = action$.do(console.log.bind(console)).share();
      const http$ = http({
        dir: __dirname + '/../dist/',
        middlewares: [
          (req: any, res: any, next: any) => {
            console.log('%s %s %s', req.method, req.url, req.path);
            next();
          }
        ],
        port: 3000,
        render: view,
        routes
      }).handler(<any>act$, options);
      return app().handler(<any>http$, options);
    }
  );
}
