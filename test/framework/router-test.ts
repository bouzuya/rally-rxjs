import assert from 'power-assert';
import { RouteAction } from '../../src/framework/route-action';
import { Route } from '../../src/framework/route';
import { Router } from '../../src/framework/router';

describe('framework/router', function() {
  it('works', function() {
    const route: Route = { path: '/users', name: 'users#index' };
    const router: Router = new Router([route]);
    const match: RouteAction = router.routes('/users');
    assert(match.type === 'route');
    assert(match.data.name === 'users#index');
    assert.deepEqual(match.data.params, {});
  });

  it('works', function() {
    const route = { path: '/users', name: 'users#index' };
    const router = new Router([route]);
    const match = router.routes('/users/');
    assert(match.type === 'route');
    assert(match.data.name === 'users#index');
    assert.deepEqual(match.data.params, {});
  });

  it('works', function() {
    const route = { path: '/users/:id', name: 'users#show' };
    const router = new Router([route]);
    const match = router.routes('/users/123');
    assert(match.type === 'route');
    assert(match.data.name === 'users#show');
    assert.deepEqual(match.data.params, { id: '123' });
  });
});
