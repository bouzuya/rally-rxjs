import assert from 'power-assert';
import { Route } from '../../src/framework/route';
import { Router } from '../../src/framework/router';

type RouteResult = { route: Route; params: { [name: string]: string; } };

describe('framework/router', function() {
  it('works', function() {
    const route: Route = { path: '/users', name: 'users#index' };
    const router: Router = new Router([route]);
    const match: RouteResult = router.routes('/users');
    assert(match.route.name === 'users#index');
    assert.deepEqual(match.params, {});
  });

  it('works', function() {
    const route = { path: '/users', name: 'users#index' };
    const router = new Router([route]);
    const match = router.routes('/users/');
    assert(match.route.name === 'users#index');
    assert.deepEqual(match.params, {});
  });

  it('works', function() {
    const route = { path: '/users/:id', name: 'users#show' };
    const router = new Router([route]);
    const match = router.routes('/users/123');
    assert(match.route.name === 'users#show');
    assert.deepEqual(match.params, { id: '123' });
  });
});
