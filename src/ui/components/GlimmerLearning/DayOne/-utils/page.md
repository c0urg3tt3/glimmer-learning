# Day One


## challenge

develop a fluid slider (or caroussel).


### starting point

a slider allow user to navigate content through previous and next action or an item index based list of action

### result

i ended up with a single component allowing fluid render.

#### Slider
- calculate the available width,
- compute the height (as result of a ratio applied to the width)

> Edit: the available width is now given by the `bounds.firstNode` instead of `this.element`

### examples


##### slides as array of slide

array of slide will be rendered by provided component.

```html
<Slider
  @slides={{slides}}
  @slidesLength={{slides.length}}
  as |slideWidth slideHeight slide|
>
  <Slide
    @slideWidth={{slideWidth}} 
    @slideHeight={{slideHeight}}>
    <p>{{slide.name}}</p>
  </Slide>
</Slider>
```

```html
<Slider
  @slides={{slides}}
  @slidesLength={{slides.length}}
  as |slideWidth slideHeight slide|
>
  <MyCustomSlide
    @slide={{slide}}
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}
  />
</Slider>
```


##### slides as components

put your slides components where there belongs.

```html
<Slider
  @slidesLength={{2}}
  as |slideWidth slideHeight|
>
  <MyCustomSlide
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}
  />
  <Slide
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}>
    <p>custom slide</p>
  </Slide>
</Slider>
```


##### slides with ratio

add a ratio argument to control the ratio.

```html
<Slider
  @slidesLength={{2}}
  @ratio={{1}}
 as |slideWidth slideHeight|
>  
  <MyCustomSlide
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}
  />
  <Slide
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}>
    <p>custom slide</p>
  </Slide>
</Slider>
```

## live demo
