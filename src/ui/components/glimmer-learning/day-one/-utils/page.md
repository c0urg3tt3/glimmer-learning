# Day One


## challenge

develop a fluid slider (or caroussel).


### starting point

a slider allow user to navigate content through previous and next action or an item index based list of action

### result

i ended up with a single component allowing fluid render.

* g-slider

is behavior is to:
- calculate the available width,
- compute the height (as result of a ratio applied to the width)


### examples


##### slides as array of slide

array of slide will be rendered by provided component.

```html
<g-slider
  @slides={{slides}}
  @slidesLength={{slides.length}}
  as |slideWidth slideHeight slide|
>
  <li
    class="slider__slide"
    style="width: {{slideWidth}}px; height: {{slideHeight}}px;"
  >
    <p>{{slide.name}}</p>
  </li>
</g-slider>
```

```html
<g-slider
  @slides={{slides}}
  @slidesLength={{slides.length}}
  as |slideWidth slideHeight slide|
>
  <my-custom-slide
    @slide={{slide}}
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}
  />
</g-slider>
```


##### slides as components

put your slides components where there belongs.

```html
<g-slider
  @slidesLength={{2}}
  as |slideWidth slideHeight|
>
  <my-custom-slide
    @slideWidth={{slideWidth}}
    @slideHeight={{slideHeight}}
  />
  <li style="width: {{slideWidth}}px; height: {{slideHeight}}px;">
    <p>custom slide</p>
  </li>
</g-slider>
```


##### slides with ratio

add a ratio argument to control the ratio.

```html
<g-slider
  @slidesLength={{2}}
  @ratio={{1}}
 as |slideWidth slideHeight|
>
  <my-custom-slide @slideWidth={{slideWidth}} />
  <li style="width: {{slideWidth}};">
    <p>custom slide</p>
  </li>
</g-slider>
```

## live demo
