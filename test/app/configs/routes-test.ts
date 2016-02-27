import assert from 'power-assert';
import { routes } from '../../../src/app/configs/routes';
import { Router, Route, RouteAction } from '../../../src/framework/router';

describe('app/config/routes', function() {
  beforeEach(function() {
    this.router = new Router(routes);
  });

  context('sign_in#index', function() {
    it('works', function() {
      const path = '/sign_in';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.params.name === 'sign_in#index');
      assert.deepEqual(match.params.params, {});
    });
  });

  context('stamp_rallies#index', function() {
    it('works', function() {
      const path = '/stamp_rallies';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.params.name === 'stamp_rallies#index');
      assert.deepEqual(match.params.params, {});
    });
  });

  context('stamp_rallies#show', function() {
    it('works', function() {
      const path = '/stamp_rallies/bouzuya';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.params.name === 'stamp_rallies#show');
      assert.deepEqual(match.params.params, { id: 'bouzuya' });
    });
  });
});
