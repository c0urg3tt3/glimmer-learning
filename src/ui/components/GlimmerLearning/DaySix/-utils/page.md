# day six


## challenge

building a demo from components.


### starting point


> Edit: No more huge difference between the playground and the ember-cli experience! as @glimmer/blueprint has been updated some bugs in Slider, Router, Route and BaseContainer has been fixed.


~~as far as i can tell, Glimmerjs even with bugs is nice to try out.~~

i can use my components in the glimmer-learning app cause we have the buildings blocks of a SPA!


### result

i tried while refactoring to comment and clean a maximun of the mess i have done the previous days.

i was able to test helpers but not components, the tooling is not ready yet.


> Edit: when menu is toggled an optimizedResize event is fired


### examples

```html
<StoreProvider as |store|>
  <RouterBrowser @basename="/" as |path pathname historyPush|>
    <DemoContainer @store={{store}} as |hasBurgerMenu toggleBurgerMenu showMenuClassname|>
      <header class="app-header">
        <LinkTo @to="{{path}}" @historyPush={{historyPush}}>
          <h1>Glimmer Learning</h1>
        </LinkTo>
        <BurgerButton @clickAction={{action toggleBurgerMenu}} />
      </header>

      <div class="app-main {{showMenuClassname}}">
        <BurgerMenu @path={{path}} @historyPush={{historyPush}} @toggleBurgerMenu={{toggleBurgerMenu}} />

        <Route @exact={{true}} @pathname={{pathname}} @path="/">
          <HomePage @historyPush={{historyPush}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-one">
          <DayOne @historyPush={{historyPush}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-two">
          <DayTwo @historyPush={{historyPush}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-three">
          <DayThree @historyPush={{historyPush}} @store={{store}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-four" as |path|>
          <DayFour @historyPush={{historyPush}} @path={{path}} @pathname={{pathname}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-five" as |path|>
          <DayFive @historyPush={{historyPush}} @path={{path}} @pathname={{pathname}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-six">
          <DaySix @historyPush={{historyPush}} />
        </Route>

        <Route @pathname={{pathname}} @path="/day-seven">
          <DaySeven @historyPush={{historyPush}} />
        </Route>
      </div>
    </DemoContainer>
  </RouterBrowser>
</StoreProvider>
```


## live demo

as mentionned since day four, this is the live demo website.
