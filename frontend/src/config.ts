export const modals = {
  addBook: "addBook",
  login: "login",
  register: "register",
  rateBook: "rateBook",
} as const;

export type modalType = (typeof modals)[keyof typeof modals];
