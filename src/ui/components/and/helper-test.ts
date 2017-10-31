import and from './helper';

const { module, test } = QUnit;

module('Helper: and', function(hooks) {
  test('false if any params are false', function(assert) {
    assert.equal(and([0,0]), false);
    assert.equal(and([0,1]), false);
    assert.equal(and([1,0]), false);
  });

  test('true if all params are true', function(assert) {
    assert.equal(and([1,1]), true);
  });
});
