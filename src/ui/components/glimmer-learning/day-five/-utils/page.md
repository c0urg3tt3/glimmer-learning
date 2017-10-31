# Day Five


## challenge

making a working router switch.


### starting point

switch router is a failure as i can t acces children args directly from parent ...

ok time to change switch approch.


### result

i come with something simpler and working

* g-switch

i even implemented minimalistic router + redux ...
but this one i 'm not really sure of some behavior ...
as i'm not sure how the time travel interact with the history ...

* g-router-redux-browser
* g-router-redux-hash
* g-router-redux-memory

spending the rest of the day looking at yarn workspaces as i try to use component between project.

i ended up with something messy, not sure i understand the architecture folder needed to accomplish what i have in mind.


### examples

```html
<g-router-browser @store={{store}} as |pathname historyPush|>
  <nav>
    <g-link @to="/foo" @historyPush={{@historyPush}}>
      foo
    </g-link>
    <g-link @to="/bar" @historyPush={{@historyPush}}>
      bar
    </g-link>
    <g-link @to="/baz" @historyPush={{@historyPush}}>
      baz
    </g-link>
  </nav>

  <g-switch @pathname={{@pathname}} as |switchAction|>
    <g-route @exact={{true}} @pathname={{@pathname}} @path="/foo" @switchIndex="1" @matchAction={{switchAction}}>
      <p>foo</p>
    </g-route>

    <g-route @pathname={{@pathname}} @path="{{path}}/bar" @switchIndex="2" @matchAction={{switchAction}}>
      <p>bar</p>
    </g-route>

    <g-route @pathname={{@pathname}} @path="{{path}}/:baz" @switchIndex="3" @matchAction={{switchAction}}>
      <p>baz</p>
    </g-route>
  </g-switch>
</g-router-browser>
```

you can render (theoricaly) sub switch in switch.

```html
<g-router-browser @store={{store}} as |pathname historyPush|>
  <nav>
    <g-link @to="/foo" @historyPush={{@historyPush}}>
      foo
    </g-link>
    <g-link @to="/foo/bar" @historyPush={{@historyPush}}>
      foo
    </g-link>
    <g-link @to="/foo/baz" @historyPush={{@historyPush}}>
      foo
    </g-link>
    <g-link @to="/bar" @historyPush={{@historyPush}}>
      bar
    </g-link>
    <g-link @to="/baz" @historyPush={{@historyPush}}>
      baz
    </g-link>
  </nav>

  <g-switch @pathname={{@pathname}} as |switchAction|>
    <g-route @pathname={{@pathname}} @path="/foo" @switchIndex="1" @matchAction={{switchAction}} as |path|>
      <p>foo</p>

      <g-switch @pathname={{@pathname}} as |switchAction|>
        <g-route @exact={{true}} @pathname={{@pathname}} @path="{{path}}/" @switchIndex="1" @matchAction={{switchAction}}>
          <p>foo</p>
        </g-route>

        <g-route @pathname={{@pathname}} @path="{{path}}/bar" @switchIndex="2" @matchAction={{switchAction}}>
          <p>bar</p>
        </g-route>

        <g-route @pathname={{@pathname}} @path="{{path}}/:baz" @switchIndex="3" @matchAction={{switchAction}}>
          <p>baz</p>
        </g-route>
      </g-switch>
    </g-route>

    <g-route @pathname={{@pathname}} @path="{{path}}/bar" @switchIndex="2" @matchAction={{switchAction}}>
      <p>bar</p>
    </g-route>

    <g-route @pathname={{@pathname}} @path="{{path}}/:baz" @switchIndex="3" @matchAction={{switchAction}}>
      <p>baz</p>
    </g-route>
  </g-switch>
</g-router-browser>
```


## live demo

no live demo as we are in nested route and for now that bug :/
