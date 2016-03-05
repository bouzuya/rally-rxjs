import assert from 'power-assert';
import { O } from 'b-o-a';
import { create, from } from '../../../src/app/actions/add-spot';

describe('app/actions/add-spot', function() {
  describe('create', function() {
    it('works', function() {
      const action = create();
      assert(action.type === 'add-spot');
      assert(action.data === undefined);
    });
  });

  describe('from', function() {
    it('works', function() {
      const action$ = from(O.of(create()));
      action$.subscribe(data => {
        assert(data === undefined);
      });
    });
  });
});
