import * as express from 'express';

type Request = { path: string; };
type Response = {
  redirect: (status: string, path: string) => void;
  send: (html: string) => void;
};

export default function main(
  proc: (request: any, response: any) => void
) {
  const app = express();
  app.use((req: any, res: any, next: any) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
  });
  app.use(express.static(__dirname + '/../../../dist/'));
  app.use(proc);
  app.listen(3000);
}
