import assert from 'power-assert';
import { routes } from '../../../src/app/routes/all';
import { RouteAction } from '../../../src/framework/route-action';
import { Router } from '../../../src/framework/router';

describe('app/routes/all', function() {
  beforeEach(function() {
    this.router = new Router(routes);
  });

  context('sign_in#index', function() {
    it('works', function() {
      const path = '/sign_in';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.data.name === 'sign_in#index');
      assert.deepEqual(match.data.params, {});
    });
  });

  context('stamp_rallies#index', function() {
    it('works', function() {
      const path = '/stamp_rallies';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.data.name === 'stamp_rallies#index');
      assert.deepEqual(match.data.params, {});
    });
  });

  context('stamp_rallies#show', function() {
    it('works', function() {
      const path = '/stamp_rallies/bouzuya';
      const match = this.router.routes(path);
      assert(match.type === 'route');
      assert(match.data.name === 'stamp_rallies#show');
      assert.deepEqual(match.data.params, { id: 'bouzuya' });
    });
  });
});
