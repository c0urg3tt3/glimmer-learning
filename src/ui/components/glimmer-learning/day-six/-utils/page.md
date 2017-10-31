# day six


## challenge

building a demo from components.

### starting point

as far as i can tell, Glimmerjs even with bugs is nice to try out.

i can use my components in the glimmer-learning app cause we have the buildings blocks of a SPA!


### result

i tried while refactoring to comment and clean a maximun of the mess i have done the previous days.

i was able to test helpers but not components, the tooling is not ready yet.

and finally we build this website!


### examples

```html
<store-provider as |store|>
  <g-router-redux-browser @store={{store}} as |pathname historyPush|>
    <demo-container @store={{store}} as |hasBurgerMenu toggleBurgerMenu showMenuClassname|>
      <header class="app-header">
        <g-link @to="/" @historyPush={{historyPush}}>
          <h1>Glimmer Learning</h1>
        </g-link>
        <burger-button @clickAction={{action toggleBurgerMenu}} />
      </header>

      <div class="app-main {{showMenuClassname}}">
        <burger-menu @historyPush={{historyPush}} @toggleBurgerMenu={{toggleBurgerMenu}} />

        <g-route @exact={{true}} @pathname={{pathname}} @path="/">
          <home-page @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-one">
          <day-one @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-two">
          <day-two @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-three">
          <day-three @historyPush={{historyPush}} @store={{store}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-four" as |path|>
          <day-four @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-five">
          <day-five @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-six">
          <day-six @historyPush={{historyPush}} />
        </g-route>

        <g-route @pathname={{pathname}} @path="/day-seven">
          <day-seven @historyPush={{historyPush}} />
        </g-route>
      </div>
    </demo-container>
  </g-router-redux-browser>
</store-provider>
```


## live demo

as mentionned since day four, this is the live demo website.
