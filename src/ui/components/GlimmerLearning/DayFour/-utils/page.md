# day four


## challenge

develop a declarative router in Glimmerjs allowing composition of page


### starting point

well, i like the way React training solved the react-router problem.

after reading the source of `react-router` and the doc of `history` API,
i have a clear vision of how to implement simple declarative routing.


### result

> Edit: No more trouble with rendering useless dom, routes and nested routes work as expected, anchor are not broken anymore.

~~well, for now glimmer component must at least render an html element ...
so no `if` to exclude template from rendering ...~~

~~the tracked arguments update bugs is not helping for testing nested child routes but theorically they work :D~~

~~and you have to click a link twice to show the screen update ...~~


#### Router
  * create history via `createHistory` hook
  * listen to history change to update location pathname


#### RouterBrowser
  * provide a browser history


#### RouterHash
  * provide a hash history


#### RouterMemory
  * provide a memory history


#### Route
  * render if the pathname (history location) and path (route path) match


#### LinkTo
  * generate an anchor that can interact with history
  * can handle a left click action before interacting with history


at this point i wasn't able to have a working switch, so was the end of the day ...


### examples

```html
<RouterBrowser
  as |pathname historyPush|
>
  <nav>
    <LinkTo
      @to="/"
      @historyPush={{@historyPush}}
    >
      homepage
    </LinkTo>
    <LinkTo
      @to="/date-picker"
      @historyPush={{@historyPush}}
    >
      date-picker
    </LinkTo>
  </nav>

  <Route
    @exact={{true}}
    @pathname={{pathname}}
    @path="/"
  >
    <h1>homepage</h1>
  </Route>

  <Route
    @pathname={{pathname}}
    @path="/date-picker"
  >
    <h1>date-picker</h1>
  </Route>
</RouterBrowser>
```

you can render nested route as well.

```html
<Route
  @pathname={{pathname}}
  @path="/foo"
  as |path|
>
  <h1>foo</h1>
  <Route
    @exact={{true}}
    @pathname={{pathname}}
    @path="{{path}}/"
  >
    <h2> index</h2>
  </Route>
  <Route
    @pathname={{pathname}}
    @path="{{path}}/bar"
  >
    <h2> bar</h2>
  </Route>
</Route>
```


## live demo

currently you are in the live demo, as the website is build using RouterBrowser.

#### nested routes
