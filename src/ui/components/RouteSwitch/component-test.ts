import { setupRenderingTest } from '@glimmer/test-helpers'
import hbs from '@glimmer/inline-precompile'

const { module, test } = QUnit

module('Component: RouteSwitch', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await this.render(hbs`<RouteSwitch />`)
    assert.ok(this.containerElement.querySelector('div'))
  })

  test('should display only one child', async function(assert) {
    this.pathname = "/"

    await this.render(
      hbs`<RouteSwitch @pathname={{pathname}} as |switchAction|>
        <Route @exact={{true}} @pathname={{pathname}} @path="/">index</Route>
        <Route @pathname={{pathname}} @path="/foo">foo</Route>
        <Route @pathname={{pathname}} @path="/bar">bar</Route>
        <Route @pathname={{pathname}} @path="/:baz">{{pathname}}</Route>
      </RouteSwitch>`
    )

    let routes = this.containerElement.querySelectorAll('.route')

    assert.ok(routes)
    assert.equal(routes.length, 1)
    assert.equal(routes[0], "index")
    //
    // this.pathname = "/youpi"
    //
    // routes = this.containerElement.querySelectorAll('.Route')
    //
    // assert.ok(routes)
    // assert.equal(routes.length, 1)
    // assert.equal(routes[0].text(), "youpi")
  })
})
