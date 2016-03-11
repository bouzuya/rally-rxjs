import test from 'ava';
import { Route } from '../../src/framework/route';
import { Router } from '../../src/framework/router';

type RouteResult = { route: Route; params: { [name: string]: string; } };

test(t => {
  const route: Route = { path: '/users', name: 'users#index' };
  const router: Router = new Router([route]);
  const match: RouteResult = router.routes('/users');
  t.ok(match.route.name === 'users#index');
  t.same(match.params, {});
});

test(t => {
  const route = { path: '/users', name: 'users#index' };
  const router = new Router([route]);
  const match = router.routes('/users/');
  t.ok(match.route.name === 'users#index');
  t.same(match.params, {});
});

test(t => {
  const route = { path: '/users/:id', name: 'users#show' };
  const router = new Router([route]);
  const match = router.routes('/users/123');
  t.ok(match.route.name === 'users#show');
  t.same(match.params, <{ [k: name]: string; }>{ id: '123' });
});
