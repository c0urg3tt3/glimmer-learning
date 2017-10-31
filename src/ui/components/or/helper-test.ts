import or from './helper';

const { module, test } = QUnit;

module('Helper: or', function(hooks) {
  test('false if all params are false', function(assert) {
    assert.equal(or([0,0]), false);
  });

  test('true if any params are true', function(assert) {
    assert.equal(or([1,0]), true);
    assert.equal(or([0,1]), true);
    assert.equal(or([1,1]), true);
  });
});
