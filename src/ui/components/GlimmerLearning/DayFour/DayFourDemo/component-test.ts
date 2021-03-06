import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: day-four-demo', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<day-four-demo />`);
    assert.ok(this.containerElement.querySelector('div'));
  });
});
