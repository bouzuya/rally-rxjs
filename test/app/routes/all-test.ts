import assert from 'power-assert';
import { routes } from '../../../src/app/routes/';
import {
  RouteAction
} from '../../../src/executors/history/route-action';
import { Router } from '../../../src/framework/router';

describe('app/routes', function() {
  let router: Router;

  beforeEach(function() {
    router = new Router(routes);
  });

  context('sign_in#index', function() {
    it('works', function() {
      const path = '/sign_in';
      const match = router.routes(path);
      assert(match.route.name === 'sign_in#index');
      assert.deepEqual(match.params, {});
    });
  });

  context('stamp_rallies#index', function() {
    it('works', function() {
      const path = '/stamp_rallies';
      const match = router.routes(path);
      assert(match.route.name === 'stamp_rallies#index');
      assert.deepEqual(match.params, {});
    });
  });

  context('stamp_rallies#show', function() {
    it('works', function() {
      const path = '/stamp_rallies/bouzuya';
      const match = router.routes(path);
      assert(match.route.name === 'stamp_rallies#show');
      assert.deepEqual(match.params, { id: 'bouzuya' });
    });
  });
});
