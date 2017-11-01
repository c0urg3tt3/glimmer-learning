# Day Five


## challenge

making a working router switch.


### starting point

switch route is the first matched has the priority to be displayed and only one can be displayed.

so i changed how i approched the problem, instead of trying to access the children match from the parent i give child hook to inform RouteSwitch of the matches.


### result

i come with something simple and working


#### RouteSwitch
 * display the first matched child


i even implemented minimalistic router + redux ...
but this one i 'm not really sure of some behavior ...
as i'm not sure how the time travel interact with the history ...


#### RouterRedux


#### RouterReduxBrowser


spending the rest of the day looking at yarn workspaces as i try to use component between project.

i ended up with something messy, not sure i understand the architecture folder needed to accomplish what i have in mind.


### examples

```html
<RouterBrowser
  @store={{store}}
  as |pathname historyPush|
>
  <nav>
    <LinkTo
      @to="/foo"
      @historyPush={{@historyPush}}
    >
      foo
    </LinkTo>
    <LinkTo
      @to="/bar"
      @historyPush={{@historyPush}}
    >
      bar
    </LinkTo>
    <LinkTo
      @to="/baz"
      @historyPush={{@historyPush}}
    >
      baz
    </LinkTo>
  </nav>

  <RouteSwitch
    @pathname={{@pathname}}
    as |switchAction|
  >
    <Route
      @exact={{true}}
      @pathname={{@pathname}}
      @path="/foo"
      @switchIndex="1"
      @matchAction={{switchAction}}
    >
      <p>foo</p>
    </Route>

    <Route
      @pathname={{@pathname}}
      @path="{{path}}/bar"
      @switchIndex="2"
      @matchAction={{switchAction}}
    >
      <p>bar</p>
    </Route>

    <Route
      @pathname={{@pathname}}
      @path="{{path}}/:baz"
      @switchIndex="3"
      @matchAction={{switchAction}}
    >
      <p>baz</p>
    </Route>
  </RouteSwitch>
</RouterBrowser>
```

you can render nested `RouteSwitch` in `RouteSwitch` or `Route`.

```html
<RouterBrowser
  @store={{store}}
  as |pathname historyPush|
>
  <nav>
    <LinkTo
      @to="/foo"
      @historyPush={{@historyPush}}
    >
      foo
    </LinkTo>
    <LinkTo
      @to="/foo/bar"
      @historyPush={{@historyPush}}
    >
      foo
    </LinkTo>
    <LinkTo
      @to="/foo/baz"
      @historyPush={{@historyPush}}
    >
      foo
    </LinkTo>
    <LinkTo
      @to="/bar"
      @historyPush={{@historyPush}}
    >
      bar
    </LinkTo>
    <LinkTo
      @to="/baz"
      @historyPush={{@historyPush}}
    >
      baz
    </LinkTo>
  </nav>

  <RouteSwitch
    @pathname={{@pathname}}
    as |switchAction|
  >
    <Route
      @pathname={{@pathname}}
      @path="/foo"
      @switchIndex="1"
      @matchAction={{switchAction}}
      as |path|
    >
      <p>foo</p>

      <RouteSwitch
        @pathname={{@pathname}}
        as |switchAction|
      >
        <Route
          @exact={{true}}
          @pathname={{@pathname}}
          @path="{{path}}/"
          @switchIndex="1"
          @matchAction={{switchAction}}
        >
          <p>foo</p>
        </Route>

        <Route
          @pathname={{@pathname}}
          @path="{{path}}/bar"
          @switchIndex="2"
          @matchAction={{switchAction}}
        >
          <p>bar</p>
        </Route>

        <Route
          @pathname={{@pathname}}
          @path="{{path}}/:baz"
          @switchIndex="3"
          @matchAction={{switchAction}}
        >
          <p>baz</p>
        </Route>
      </RouteSwitch>
    </Route>

    <Route
      @pathname={{@pathname}}
      @path="{{path}}/bar"
      @switchIndex="2"
      @matchAction={{switchAction}}
    >
      <p>bar</p>
    </Route>

    <Route
      @pathname={{@pathname}}
      @path="{{path}}/:baz"
      @switchIndex="3"
      @matchAction={{switchAction}}
    >
      <p>baz</p>
    </Route>
  </RouteSwitch>
</RouterBrowser>
```


## live demo

#### nested RouteSwitch
