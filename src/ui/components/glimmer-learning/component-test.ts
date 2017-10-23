import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: glimmer-learning', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<glimmer-learning />`);
    assert.equal(this.containerElement.textContent, 'Welcome to Glimmer!\n');
  });
});
