// @flow
import { type Customer, type CustomerStatusMap } from 'src/customer-status/customer-status-types';

// this would come down from the server.
const customers: $ReadOnlyArray<Customer> = [
  {
    id: 1,
    fullName: 'Alan Alda',
  },
  {
    id: 2,
    fullName: 'Brian Boytano',
  },
  {
    id: 3,
    fullName: 'Chevy Chase',
  },
  {
    id: 4,
    fullName: 'Doris Day',
  },
];

const getDefaultCustomerStatusMap = (): CustomerStatusMap =>
  new Map(customers.map((customer: Customer) =>
    ([customer, { visible: false }])
  ));

export default getDefaultCustomerStatusMap;
