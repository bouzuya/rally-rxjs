import * as express from 'express';

type Request = { path: string; };
type Response = {
  redirect: (status: string, path: string) => void;
  send: (html: string) => void;
};

export default function main(
  dir: string,
  middlewares: any[],
  port: number,
  proc: (request: any, response: any) => void
) {
  const app = express();
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
  app.use(express.static(dir)); // TODO: if dir is null
  app.use(proc);
  app.listen(port); // TODO: if port is null
}
