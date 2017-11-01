# Day Two


## challenge

develop a date-picker.


### starting point

looking at my windows date time to partially reproduce the behavior.

a finite state machine should be appropriate to manage date-picking work flow.


### result

used to redux i reproduced the principle to handle state of the date-picker,
and that worked just fine!


#### DatePicker
  * a complete date picker with YearPicker, MonthPicker and DayPicker


#### PickerHeader
  * an information link
  * previous and next buttons to change picker List


#### PickerList
  * a list used to display either years or months


#### PickerListItem
  * a list item used to display either year, month or day


#### DayPicker
  * a complete day picker with PickerHeader and DayPickerList


#### DayPickerList
  * a list used to display days with a header for week day


### examples

```html
<g-date-picker
  @year={{2017}}  
  @month={{0}}
  @day={{1}}
/>
```

## live demo
