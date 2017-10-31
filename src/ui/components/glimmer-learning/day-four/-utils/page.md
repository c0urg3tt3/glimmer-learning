# day four


## challenge

develop a declarative router in Glimmerjs allowing composition of page


### starting point

well, i like the way React training solved the react-router problem.

after reading the source of `react-router` and the doc of `history` API,
i have a clear vision of how to implement simple declarative routing.


### result

well, for now glimmer component must at least render an html element ...
so no `if` to exclude template from rendering ...

the tracked arguments update bugs is not helping for testing nested child routes but theorically they work :D

and you have to click a link twice to show the screen update ...

* g-router
* g-router-browser
* g-router-hash
* g-router-memory

* g-route
* g-link

but i wasn't able to have a working switch, so was the end of the day ...


### examples

```html
<g-router-browser as |pathname historyPush|>
  <nav>
    <g-link @to="/" @historyPush={{@historyPush}}>
      homepage
    </g-link>
    <g-link @to="/g-date-picker" @historyPush={{@historyPush}}>
      g-date-picker
    </g-link>
  </nav>

  <g-route @exact={{true}} @pathname={{pathname}} @path="/">
    <h1>homepage</h1>
  </g-route>

  <g-route @pathname={{pathname}} @path="/g-date-picker">
    <h1>date-picker</h1>
  </g-route>
</g-router-browser>
```

you can render (theoricaly) sub route as well.

```html
<g-route @exact={{true}} @pathname={{pathname}} @path="/foo" as |path|>
  <h1>foo</h1>
  <g-route @exact={{true}} @pathname={{pathname}} @path="{{path}}/">
    <h2> index</h2>
  </g-route>
  <g-route @pathname={{pathname}} @path="{{path}}/bar">
    <h2> bar</h2>
  </g-route>
</g-route>
```


## live demo

currently you are in the live demo, as the website is build using g-router-browser.
