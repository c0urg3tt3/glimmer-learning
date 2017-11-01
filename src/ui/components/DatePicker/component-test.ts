import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: date-picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<date-picker />`);
    assert.ok(this.containerElement.querySelector('div'));
    assert.ok(this.containerElement.classList.contains('date-picker'));
    assert.equal(this.containerElement.textContent, '📅');
  });
});
