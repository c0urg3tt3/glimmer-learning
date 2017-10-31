import gt from './helper';

const { module, test } = QUnit;

module('Helper: gt', function(hooks) {
  test('false if equal or lower', function(assert) {
    assert.equal(gt([1,1]), false);
    assert.equal(gt([1,2]), false);
  });

  test('true if greater', function(assert) {
    assert.equal(gt([2,1]), true);
  });
});
