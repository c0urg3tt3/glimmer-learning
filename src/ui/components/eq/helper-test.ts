import eq from './helper';

const { module, test } = QUnit;

module('Helper: eq', function(hooks) {
  test('false if lower or greater', function(assert) {
    assert.equal(eq([1,"1"]), false);
    assert.equal(eq(["1",1]), false);
  });

  test('true if equal', function(assert) {
    assert.equal(eq([1,1]), true);
  });
});
