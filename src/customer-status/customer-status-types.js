// @flow

// ***** Core types *****
type InvisibleStatus = {
  visible: false,
};

type VisibleStatus = {
  visible: true,
  displayName: string,
};

export type CustomerStatus = VisibleStatus | InvisibleStatus;

// a type that comes from the server
export type Customer = {
  id: number,
  fullName: string,
};

export type CustomerStatusMap = Map<Customer, CustomerStatus>;
