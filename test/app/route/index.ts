import test from 'ava';
import { routes } from '../../../src/app/route/';
import {
  RouteAction
} from '../../../src/executors/history/route-action';
import { Router } from '../../../src/framework/router';

test.beforeEach(t => {
  t.context.router = new Router(routes);
});

test('sign_in#index', t => {
  const router: Router = t.context.router;
  const path = '/sign_in';
  const match = router.routes(path);
  t.ok(match.route.name === 'sign_in#index');
  t.same(match.params, {});
});

test('stamp_rallies#index', t => {
  const router: Router = t.context.router;
  const path = '/stamp_rallies';
  const match = router.routes(path);
  t.ok(match.route.name === 'stamp_rallies#index');
  t.same(match.params, {});
});

test('stamp_rallies#show', t => {
  const router: Router = t.context.router;
  const path = '/stamp_rallies/bouzuya';
  const match = router.routes(path);
  t.ok(match.route.name === 'stamp_rallies#show');
  t.same(match.params, <{ [k: string]: string; }>{ id: 'bouzuya' });
});
