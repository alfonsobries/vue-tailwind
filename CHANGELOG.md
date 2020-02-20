# Changelog

All notable changes to `vue-tailwind` will be documented in this file

## 0.1.22 - 2019-07-04

- Start tracking changes

## 0.1.23 - 2019-07-04

- New Table component

## 0.1.26 - 2019-07-08

- New Pagination & Modal components

## 0.1.28 - 2019-07-17

- TButton vue router compatibility

## 0.1.30 - 2019-07-22

- [Fixed] When TTable headers has value still send the full row data to the props
- [Fixed] When TModal is opened on load still calculates the margin

## 0.1.31 - 2019-07-23

- [Feature] The TTable thead & tfoot props now include the headers (useful for a dynamic colspan)
- [Fixed] The TButton props are not getted using a method instead a computed property, that avoid exceptions 
- [Fixed] The TSelect now handles null values correctly
- [Fixed] When the TModal is destroyed witouth closing now clears the body lock

## 0.2.0 - 2019-07-25

- [Style] Radio group & checkbox group now uses the same tone for status colors
- [Feature] Better organization for InputGroup theming

## 0.3.0 - 2019-07-26

- [Feature] The multioption components now allows you to select which attribute should be used as as value and text in the options
- [Feature] The t-select now accepts a placeholder that creates an empty option

## 0.4.0 - 2019-07-26

- [Feature] You can import a single components passing the theme as configuration

## 0.4.3 - 2020-02-20

- [Fixed] Modal is not in default template
