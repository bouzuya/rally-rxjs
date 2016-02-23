import express from 'express';
import { HTML } from './types';

type Request = { path: string; };
type Response = {
  redirect: (status: string, path: string) => void;
  send: (html: string) => void;
};

export default function main(
  server: { request: (path: string) => Promise<HTML> }
) {
  const app = express();
  app.use((req: any, res: any, next: any) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
  });
  app.use(express.static(__dirname + '/../../dist/'));
  app.use((req: Request, res: Response): void => {
    server
      .request(req.path)
      .then(html => {
        res.send(html);
      }, error => {
        if (error.message === 'redirect') {
          const { status, path }: any = error;
          res.redirect(status, path);
        } else {
          res.send(error.message);
        }
      });
  });
  app.listen(3000);
}