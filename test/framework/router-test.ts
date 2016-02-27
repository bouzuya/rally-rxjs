import assert from 'power-assert';
import { Router, Route, RouteAction } from '../../src/framework/router';

describe('framework/router', function() {
  it('works', function() {
    const route: Route = { path: '/users', type: 'users#index' };
    const router: Router = new Router([route]);
    const match: RouteAction = router.routes('/users');
    assert(match.type === 'users#index');
    assert.deepEqual(match.params, {});
  });

  it('works', function() {
    const route = { path: '/users', type: 'users#index' };
    const router = new Router([route]);
    const match = router.routes('/users/');
    assert(match.type === 'users#index');
    assert.deepEqual(match.params, {});
  });

  it('works', function() {
    const route = { path: '/users/:id', type: 'users#show' };
    const router = new Router([route]);
    const match = router.routes('/users/123');
    assert(match.type === 'users#show');
    assert.deepEqual(match.params, { id: '123' });
  });
});
