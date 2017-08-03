# Type Driven Development with Flow

> Follow along [here](https://docs.google.com/presentation/d/1TPhPTAPdLWLMqFzM86CSitVQZEiTIBwlOJeThrufrkc/edit?usp=sharing).

In this presentation, I'm going to introduce type driven development with flow. We're going to:

* Specify our types in advance.
* These types be the API for tightly-coupled components. (Without flow, I would be wary of subdividing tightly coupled components. With flow, I'm willing to subdivide them into their natural units.)
* Introduce typos, and see how flow catches them.
* Change our API, and show how flow guides us through a refactor until the component is in a valid state.

## What is Flow?

Flow is a static type checker for Javascript. It allows us to catch a class of errors at compile time, such as:

```js
   const a = 3;
   const firstDigit = a.substring(1);
```

This gives us:

```
const firstDigit = a.substring(1);
                     ^^^^^^^^^ property `substring`. Property not found in
const firstDigit = a.substring(1);
                   ^ Number
```

Flow allows you to specify custom types, such as:

```js
type Customer = {
  id: number,
  name: string,
};

// functions also have types
const isValidCustomer: (customer: Customer) => boolean { /* ... */ };
```

Properly set up, your IDE will now help you with autocompletion.

This presentation presumes a working understanding of static typing. Your intuitions from Java should serve you well.

## What is type driven development?

Type driven development is a concept I borrowed from [this book](https://www.manning.com/books/type-driven-development-with-idris). In this presentation, it will mean:

* Defining types explicitly and in advance, being as restrictive as possible.
* Leaning heavily on the flow type checker to validate our code.
* Refactors should be type-first. The type definitions should change, and then *flow will direct us to all parts of the code that are broken.*

## Some Flow Concepts and Terminology

We're going to dive deeply into a few concepts, so we should brush up on them. Don't worry about understanding them too deeply, their behavior should be clear in context.

### Generic Types

Flow supports generic types, such as:

* `$ReadOnlyArray<number>`: a read-only array of numbers
* `Map<Customer, Status>`: a map whose keys are `Customer`s and whose values are `Status`es.

> What are maps? Maps are ES6 hashes that can have keys of any type. (In plain old objects, if your keys are objects, `toString` is called on them, and they map to the same key.)

### Union Types

```js
type InvisibleStatus = {
  visible: false, // flow lets you specify concrete values!
};

type VisibleStatus = {
  visible: true,
  selectedDays: $ReadOnlyArray<DayOfWeek>,
};

type Status = InvisibleStatus | VisibleStatus;

const myInvisibleStatus: Status = { visible: false }; // works
const myVisibleStatus: Status = { visible: true }; // fails!

// We get this fairly long error message.

//  33: const myVisibleStatus: Status = { visible: true };
//                                      ^^^^^^^^^^^^^^^^^ object literal. This type is incompatible with
//  33: const myVisibleStatus: Status = { visible: true };
//                             ^^^^^^ union: InvisibleStatus | VisibleStatus
//   Member 1:
//    31: type Status = InvisibleStatus | VisibleStatus;
//                      ^^^^^^^^^^^^^^^ InvisibleStatus
//   Error:
//    33: const myVisibleStatus: Status = { visible: true };
//                                                   ^^^^ boolean. Expected boolean literal `false`, got `true` instead
//    23:   visible: false, // flow lets you specify concrete values!
//                   ^^^^^ boolean literal `false`
//   Member 2:
//    31: type Status = InvisibleStatus | VisibleStatus;
//                                        ^^^^^^^^^^^^^ VisibleStatus
//   Error:
//    31: type Status = InvisibleStatus | VisibleStatus;
//                                        ^^^^^^^^^^^^^ property `selectedDays`. Property not found in
//    33: const myVisibleStatus: Status = { visible: true };
//                                        ^^^^^^^^^^^^^^^^^ object literal

// likewise, this will fail similarly
const newStatus: (status: Status) => Status {
  status.visible = true;
  return status;
};
```

### Some advanced flow types

#### $Shape<T>

A subset of another type `T`.

```js
type MyComponentState = {
  name: string,
  age: number,
};

// within the component, this.setState accepts a parameter of
// type $Shape<MyComponent>. Thus the following is valid:

this.setState({
  name: 'Robert',
});

// but this is not valid:
this.setState({
  name: 'Robert',
  occupation: 'Engineer',
});

// giving us
// property `occupation` of object literal. Property not found in
// object type
```

#### $Keys<T>

The keys of a type. (You can use `typeof myObject` to get the type of an object).

```js
type MyFormState = {
  name: string,
  neighborhood: string,
};

type Field = $Keys<MyFormState>;

const field1: Field = 'name'; // works
const field2: Field = 'neighbourhood'; // fails! Flow catches typos!
```

Use this with a Map to create associated types!

```js
type FormErrors = Map<Field, string>;
```

#### Exact object types

Whenever possible, we will use exact object types. These are specified with pipes, e.g.

```js
type MyState = {|
  isReady: boolean,
  name: string,
|}
```

This means that an object of type `MyState` cannot have any extra properties. (This is similar to `$Shape`, but also does not make every field optional!)

## Getting Started

As we get started, please check out the tags `v1`, `v2`, etc. depending on the step you are on, and run `npm run flow:watch` and `npm start`. Navigate to `localhost:3000`.

### Problem definition

We will be doing our work in the context of the following use case:

* A two page form, each of which has two textual inputs.
* A next button, which, when pressed:
  * Determines whether there are errors. If there are errors, they render.
  * If there are no errors, transitions to the next page, OR makes a mocked API request.

### Step 1: Defining our types

> This is tag `v1`

We 