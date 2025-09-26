export const modals = {
  addBook: "addBook",
  login: "login",
  register: "register",
  rateBook: "rateBook",
  editBook: "editBook",
  rating: "rating",
  addUser: "addUser",
} as const;

export type modalType = (typeof modals)[keyof typeof modals];

export const queryKeys = {
  books: "books",
  user: "user",
  users: "users",
} as const;

export type queryKeyType = (typeof queryKeys)[keyof typeof queryKeys];

export const USER_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const PAGE_SIZES = [5, 10, 20];

export const DEBOUNCE_TIME = 700; // milliseconds

export const NOTIFICATION_DISPLAY_TIME = 5000; // milliseconds
