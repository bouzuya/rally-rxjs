import assert from 'power-assert';
import { Router, Route, RouteAction } from '../../src/framework/router';

describe('framework/router', function() {
  it('works', function() {
    const route: Route = { path: '/users', name: 'users#index' };
    const router: Router = new Router([route]);
    const match: RouteAction = router.routes('/users');
    assert(match.type === 'route');
    assert(match.params.name === 'users#index');
    assert.deepEqual(match.params.params, {});
  });

  it('works', function() {
    const route = { path: '/users', name: 'users#index' };
    const router = new Router([route]);
    const match = router.routes('/users/');
    assert(match.type === 'route');
    assert(match.params.name === 'users#index');
    assert.deepEqual(match.params.params, {});
  });

  it('works', function() {
    const route = { path: '/users/:id', name: 'users#show' };
    const router = new Router([route]);
    const match = router.routes('/users/123');
    assert(match.type === 'route');
    assert(match.params.name === 'users#show');
    assert.deepEqual(match.params.params, { id: '123' });
  });
});
