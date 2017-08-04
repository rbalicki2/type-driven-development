// @flow

// ***** Core Form Data Types *****
export type FormData = {|
  firstName: string,
  lastName: string,
  occupation: string,
  idealOccupation: string,
|};

export type Field = $Keys<FormData>;

// an error is just a string.
export type FormErrors = Map<Field, string>;

// ***** These are the types that deal with transitioning through
//       the form. *****
export type FormState = {|
  currentPage: Page,
  data: FormData,
  currentPageHasSubmitted: boolean,
|};

export type Page = {|
  visibleFields: $ReadOnlyArray<Field>,
  component: ReactClass<FormPageProps>,
  nextPage?: Page, // types can be recursive!
|};

// ***** These are the types that define the API between the parent
//       component and child components *****
export type FormPageProps = {|
  formData: FormData,
  updateFormData: ($Shape<FormData>) => void,
  errors: FormErrors,
|};
