# Type Driven Development with Flow

> Follow along [here](https://docs.google.com/presentation/d/1TPhPTAPdLWLMqFzM86CSitVQZEiTIBwlOJeThrufrkc/edit?usp=sharing).

In this presentation, I'm going to introduce type driven development with flow. We're going to:

* Specify our types in advance.
* These types be the API for tightly-coupled components. (Without flow, I would be wary of subdividing tightly coupled components. With flow, I'm willing to subdivide them into their natural units.)
* Introduce typos, and see how flow catches them.
* Change our API, and show how flow guides us through a refactor until the component is in a valid state.

Separately, we are going to show a user interface where a each customer in a list can either be visible, or invisible. If visible, it has an optional `displayName` parameter. I will demonstrate that flow prevents us from ever having a customer whose status is `invisible` with a `displayName`, or `visible` without a `displayName`.

## What is type driven development?

Type driven development is a concept I borrowed from [this book](https://www.manning.com/books/type-driven-development-with-idris). In this presentation, it will mean:

* Defining types explicitly and in advance, being as restrictive as possible.
* Leaning heavily on the flow type checker to validate our code.
* Refactors should be type-first. The type definitions should change, and then *flow will direct us to all parts of the code that are broken.*

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

## Part 1: Leaning on flow for refactoring

As we get started, please check out the tags `v1.1`, `v1.2`, etc. depending on the step you are on, and run `npm run flow:watch` and `npm start`. Navigate to `localhost:3000/#/form`.

In this problem, we will do the following:

* A two page form, each of which has two textual inputs.
* A next button, which, when pressed:
  * Determines whether there are errors on that page. If there are errors, they render.
  * If there are no errors, transitions to the next page, OR makes a mocked API request.

### Step 1: Defining our types and some utility functions

> This is tag `v1.1`

We define all of our types in `src/form/form-types` and some utility functions in `src/form/form-utilities`.

### Step 2: Writing the components

> This is tag `v1.2`

Now, we create the components `src/form/index.jsx`, `src/form/Page1.jsx` and `src/form/Page2.jsx`. In addition, we define the pages in `src/form/form-pages`.

### Step 3: Introduce a typo

> This is tag `v1.3`

Now, we introduce a type in `idealOccupation`. Note that `flow` complains, although the form still runs. The only way we know that an error had occured is that the API request fails!

In addition, if `idealOccupation` had been an optional field, we potentially never would have known that the form was broken! We would only have noticed later, when the `idealOccupation` column was not populated in the database.

### Step 4: Introduce a refactor

> This is tags `v1.4.1` and `v1.4.2`

Now, we introduce a refactor.

* **tag `v1.4.1`**: If we remove a field, we are essentially introducing a typo. However, we will fix it from the other side: instead of fixing the typo, we remove all references to the old field. (Fixing the type errors is left as an exercise to the reader, and will be done during the demo.)
* **tag `v1.4.2`**: If we add a field, flow will imperfectly guide us through adding more fields to the rest of the code.

## Part 2: Using Union types for to prevent logic errors

As we get started, please check out the tags `v2.1`, `v2.2`, etc. depending on the step you are on, and run `npm run flow:watch` and `npm start`. Navigate to `localhost:3000/#/union`.

### Step 1: Defining our types

> This is tag `v2.1`

We will define our primary types: `Customer` and `Status`, which is a union of `VisibleStatus` and `InvisibleStatus`.

### Step 2: Writing the components

> This is tag `v2.2`

We create our components: a top level component, a left-hand side visibility selector, and a right-hand side preferred name input.

### Step 3: Attempting to introduce logic errors

> This is tag `v2.3`

Now, we attempt to simplify the code in a few places that could introduce logic errors. Note how flow complains!