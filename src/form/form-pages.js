// @flow
import { type Page } from 'src/form/form-types';
import FormPage1 from 'src/form/FormPage1';
import FormPage2 from 'src/form/FormPage2';

const secondPage: Page = {
  visibleFields: ['occupation', 'idealOccupation'],
  component: FormPage2,
};

const firstPage: Page = {
  visibleFields: ['firstName', 'lastName'],
  component: FormPage1,
  nextPage: secondPage,
};

const pages: $ReadOnlyArray<Page> = [firstPage, secondPage];
export default pages;

export const initialPage: Page = firstPage;
