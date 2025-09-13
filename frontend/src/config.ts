export const modals = {
  addBook: "addBook",
  login: "login",
  register: "register",
  rateBook: "rateBook",
  editBook: "editBook",
} as const;

export type modalType = (typeof modals)[keyof typeof modals];

export const queryKeys = {
  books: "books",
  user: "user",
} as const;

export type queryKeyType = (typeof queryKeys)[keyof typeof queryKeys];

export const USER_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours
