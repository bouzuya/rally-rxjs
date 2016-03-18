import test from 'ava';
import { O } from 'b-o-a';
import { create, from } from '../../src/actions/views/add-spot';

test('create', t => {
  const action = create();
  t.ok(action.type === 'views/add-spot');
  t.ok(action.data === undefined);
});

test('from', t => {
  const action$ = from(O.of(create()));
  return <any>action$.do(data => {
    t.ok(data === undefined);
  });
});
