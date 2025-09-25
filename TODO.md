5 Sep

- [x] Settings file and .env
- [x] Refactor auth and CRUD
- [x] add fronend
- [x] add static file serving
- [x] push to git

7 sep

- [x] set up tailwind / headless ui / react-query / router
- [x] set up the main books screen
- [ ] figure out relation for book with reatings

8 Sep

- [ ] add pagination and refactor book list (to smaller components)
- [x] add book form
- [x] add login system
- [x] change app name and favicon

9 Sep

- [x] add logout system and user preservation

11 Sep

- [x] add react router and make modals depand on query params
- [x] move query keys to config
- [x] fix modal layout
- [x] fix input and naming convention for ui components
- [x] fix inbound modal animation

12 Sep

- [x] add delete and edit book functionalities

13 Sep

- [x] add pagination

15 Sep

- [x] add filtering and debounce

17 Sep

- [x] move to page 0 when filters are applied, sync it with debounce
- [x] add rating avg for each book (BE)
- [x] add rating button in the actions

18 Sep

- [x] add rating modal (if button will not sufice)

20 Sep

- [x] fix pagination (regression)
- [x] add rating error handling and blockade for second rating for same user / same book
- [x] turn off rating btn for guest (not logged-in)

21 Sep
- [x] add two fields to user model: role and is_active (default to false for registration)
- [x] add user management dashboard (table and edit modal)

24 Sep

- [x] add register modal and user registration
- [x] add user type and display constraints (FE)
- [x] fix filters (make it more generic, maybe use Object.keys(...))

25 Sep

- [x] add users filtering
- [x] add notifications

Queue

- [ ] fix python errors in routers
- [ ] decompose bigger components (e.g. headers)
- [ ] double-check if protected route is safe ( || conditions)
- [ ] deploy app + pipeline
- [ ] change perPage component to something more like select
- [ ] add authorization to swagger
- [ ] add linting
- [ ] add role-base authenthication to router (BE)
