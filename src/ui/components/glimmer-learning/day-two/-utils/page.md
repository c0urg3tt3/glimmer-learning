# Day Two


## challenge

develop a date-picker.


### starting point

looking at my windows date time to partially reproduce the behavior.

a finite state machine should be appropriate to manage date-picking work flow.


### result

used to redux i reproduced the principle to handle state of the date-picker,
and that worked just fine!

  * g-date-picker
  * g-picker-header
  * g-picker-list
  * g-picker-list-item
  * g-day-picker
  * g-day-picker-list

```html
<g-date-picker @year={{2017}}  @month={{0}} @day={{1}}/>
```

## live demo
