// @flow
import {
  type FormData,
  type FormErrors,
} from 'src/form/form-types';

// eslint can't handle generic functions
// eslint-disable-next-line
const convertToNonOptional = <T>(t: ?T): T => {
  if (t) {
    return t;
  }
  throw new Error('Argument is required');
};

export const getErrors = (data: FormData): FormErrors => {
  const map: FormErrors = new Map();

  if (!data.firstName) {
    map.set('firstName', 'First name is required');
  } else if (data.firstName === 'Robert') {
    map.set('firstName', 'You cannot be named Robert.');
  }

  if (!data.lastName) {
    map.set('lastName', 'Last name is required');
  }
  if (!data.occupation) {
    map.set('occupation', 'Occupation is required');
  }
  if (!data.idealOccupation) {
    map.set('idealOccupation', 'Ideal occupation is required');
  }

  return map;
};

// eslint-disable-next-line
export const makeApiCall = (data: FormData) => {
  // eslint-disable-next-line
  alert('Making api call');
};
