# day three


## challenge

integrate [Redux]() as state machine available for the app.


### starting point

the redux doc is heavily related to react, but as Glimmerjs is a view library as well, we should not have so many problems.


### result

> Edit: BaseContainer map initiale locale `state` on construct


#### StoreProvider
  * provide a store to the app


#### BaseContainer
  * subscribe to the store for state update
  * map state to locale state
  * map dispatch to actions


exactly at that time, that day, 6 minutes after i have a working Glimmer Redux someone released a glimmer-redux on Github ... the fact that we ended up with a similar naming but not a similar solution to solve the problem is great!

i borrowed one things from his code!

```js
Object.keys(actions).forEach(action => {
  Object.defineProperty(this, action, {
    enumerable: true,
    set: () => {},
    get: () => actions[action]
  })
})
```

i was doing something similar

```js
for (let action in actions) {
  this[action] = actions[action]
}
```

that made the object enumerable but also configurable and writable ...

and clearly i don't want something to mess with my state machine actions so `Object.defineProperty` was better!

> Object.keys() and for...in are equivalent to list enumerable property.

### examples

```html
<StoreProvider as |store|>
  <CounterContainer
    @store={{@store}}
    as |
      counter
      increment
      decrement
      clearCounter
    |
  >
    <button
      onclick={{action clearCounter}}
    > clear </button>
    <button
      onclick={{action decrement}}
    > - </button>
    <output value={{counter}} />
    <button
      onclick={{action increment}}
    > + </button>
  </CounterContainer>
</StoreProvider>
```

## live demo
