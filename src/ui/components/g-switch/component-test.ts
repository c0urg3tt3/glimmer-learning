import { setupRenderingTest } from '@glimmer/test-helpers'
import hbs from '@glimmer/inline-precompile'

const { module, test } = QUnit

module('Component: g-switch', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await this.render(hbs`<g-switch />`)
    assert.ok(this.containerElement.querySelector('div'))
    // assert.ok(this.containerElement.querySelector('.g-switch'))
  })

  test('should display only one child', async function(assert) {
    this.pathname = "/"

    await this.render(
      hbs`<g-switch @pathname={{pathname}} as |switchAction|>
        <g-route @exact={{true}} @pathname={{pathname}} @path="/">index</g-route>
        <g-route @pathname={{pathname}} @path="/foo">foo</g-route>
        <g-route @pathname={{pathname}} @path="/bar">bar</g-route>
        <g-route @pathname={{pathname}} @path="/:baz">{{pathname}}</g-route>
      </g-switch>`
    )

    let routes = this.containerElement.querySelectorAll('.g-route')

    assert.ok(routes)
    assert.equal(routes.length, 1)
    assert.equal(routes[0], "index")
    //
    // this.pathname = "/youpi"
    //
    // routes = this.containerElement.querySelectorAll('.g-route')
    //
    // assert.ok(routes)
    // assert.equal(routes.length, 1)
    // assert.equal(routes[0].text(), "youpi")
  })
})
