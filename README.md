# Compear <sup>🍐</sup>🤷<sup>🍐</sup>

_Utilities for comparing and sorting with comparators in JavaScript_

**[Documentation]**

## Installation

```shell
npm install compear
```

## What is this?

Let's look at an example.
Suppose you have a list of objects...

```javascript
const people = [
    { firstName: "Tina", lastName: "Ham" },
    { firstName: "Bob", lastName: "Builder" },
    { firstName: "Lewis", lastName: "Mayor" },
];
```

...and you want to sort the array alphabetically by the "lastName" property.

Without Compear, you can write:

```javascript
const peopleSorted = people.toSorted((personA, personB) => {
    if (personA.lastName < personB.lastName) {
        return -1;
    } else if (personA.lastName > personB.lastName) {
        return 1;
    } else {
        return 0;
    }
});
```

With Compear, you can write:
```javascript
const peopleSorted = people.toSorted(compareBy((person) => person.lastName));
```

Both examples use the `array.toSorted(..)` function that is built-in to JavaScript.
The difference is in how you write the function that is passed as an argument to `array.toSorted(..)`.
This kind of function is called a _comparator_.
Creating and using comparators is what Compear is all about.

Compear is written in TypeScript and provides strong type safety.

## Notable features

### `naturalOrder`

`naturalOrder` is meant to be a sensible default comparator for many cases.
It works well for comparing numbers, strings, or lists of these values.
For other types of values,
you will probably need to create a more specific comparator.

In some of the provided functions (such as `compareBy`),
Compear uses `naturalOrder` by default,
but allows you to provide a different comparator if needed.

### `compareBy`

The `compareBy` function can create a comparator that selects a specific property to compare,
or somehow derives another value to be compared.

### `compareWith`

`compareWith` chains together multiple comparators.
This is useful when you want to: "sort by X, but if X is equal, then sort by Y, etc."

### `minWith` / `maxWith`

These functions find the smallest or largest value from a list of values using any given comparator.

_See the [documentation] for more._

## Examples

Here are some examples of what you can do with Compear:

```javascript
import { compareBy, compareByDesc, compareWith, minWith } from "compear";

const heros = [
    {
        name: "Frozone",
        age: 37,
        favoriteColor: "blue",
    },
    {
        name: "Stupendous Man",
        age: 9,
        favoriteColor: "red",
    },
    {
        name: "Iron Man",
        age: 44,
        favoriteColor: "gold",
    },
];

const youngestHero = minWith(heros, compareBy("age"))

const sortedByName = heros.sort(compareBy("name"));

const sortedByNameAndGoldFirst = heros.toSorted(
    compareWith(
        compareByDesc("favoriteColor", (color) => color === "gold"),
        compareBy("name"),
    )
);
```

## About

Compear takes some inspiration from Kotlin's [kotlin.comparisons](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.comparisons/) package, but is designed for JavaScript.

Compear embraces functional programming to a certain extent.
It prioritizes the treatment of comparator functions as first-class citizens especially because they are highly composable and re-usable in practical applications.
On the other hand, some functions have a chosen parameter order that prioritizes readability over the possibility of currying.

[Documentation]: https://camsteffen.github.io/compear/index.html
