import test from 'ava';
import { routes } from '../../../src/app/route/';
import { init, Router } from 'boajs-router';
import { Route } from '../../../src/framework/route';

type MyRouter = Router<Route>;

test.beforeEach(t => {
  t.context.router = init(routes);
});

test('sign_in#index', t => {
  const router: MyRouter = t.context.router;
  const path = '/sign_in';
  const match = router(path);
  t.ok(match.route.name === 'sign_in#index');
  t.same(match.params, {});
});

test('stamp_rallies#index', t => {
  const router: MyRouter = t.context.router;
  const path = '/stamp_rallies';
  const match = router(path);
  t.ok(match.route.name === 'stamp_rallies#index');
  t.same(match.params, {});
});

test('stamp_rallies#show', t => {
  const router: MyRouter = t.context.router;
  const path = '/stamp_rallies/bouzuya';
  const match = router(path);
  t.ok(match.route.name === 'stamp_rallies#show');
  t.same(match.params, <{ [k: string]: string; }>{ id: 'bouzuya' });
});
