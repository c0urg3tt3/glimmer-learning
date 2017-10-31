import lt from './helper';

const { module, test } = QUnit;

module('Helper: lt', function(hooks) {
  test('false if equal or greater', function(assert) {
    assert.equal(lt([1,1]), false);
    assert.equal(lt([2,1]), false);
  });

  test('true if lower', function(assert) {
    assert.equal(lt([1,2]), true);
  });
});
