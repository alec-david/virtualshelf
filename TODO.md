# Refactor TODO:
Components that can be reused across all 3:
+ SearchBooks/SearchMovies.js (just pass in type (books, movies) for placeholder text)
+ FilterBookDropdown
+ BookCardContent (at least settings part)
+ BookList (maybe - would need to check if I can pass component down dynamically -- might be more trouble then its worth) (Also pull add new logic up into visiblebooklist then can just pass that down)
+ In NewBookCard/NewMovieCard, pull plus sign component into individual component (can be reused across all 3)
+ make dateRead/date_read consistent (probably date_read since thats the db method but whatever) -- ACTUALLY => Just change to generic date so it doesn't have to be different for all 3
+ When no cards available. Display some kinda message instead of search + filter
+ Break up long strings in description

# TODO
+ toast on login/logout.
+ Lazy loading of books (client side) (should I pull all books down and then lazily display -- research)
+ switch getBooks/getUserBooks so they return JSON object w/ type...
+ add padding to everything (cards, search, filter - make everything pop more)
+ refactor actions into seperate actions (user, book, movie, tv)
+ Switch async promise hydrate stuff to use redux-thunk
+ Display useful links in errors (ex: if registering and email exists, link to login page. If logging in and email does not exist, link to register.)
+ Create microservice that gets cover/image for each entry (would be a good use for Go)

# Front End Stuff
+ General page when not logged in -> shows all recent entries (across all 3 options)
+ General page when logged in -> Shows all recent entries for current user
+ Once all that is working, implement for tv and movies.
+ Unit testing
+ Refactoring (AddBook - move constants out of container)
+ Styling...

# Completed
+ ~~Switch default filter to date read~~
+ ~~Don't show current filter in dropdown~~
+ ~~add settings options for logged out users. They can 'Hide' or 'Flag' (if offensive/bad content). Add flagged boolean to db. Don't display to all if flagged == T.~~
+ ~~Filter books (client side) (filter by search title/author) (filter by date read/rating/title etc)~~
+ ~~Create star system for ratings instead of number dropdown~~
+ ~~Add edit functionality to books~~
+ ~~Once login process setup, get user id working where only shows items where user id === current user id~~
+ ~~Cached login status so don't have to login everytime (using localStorage)~~
+ ~~Created profile page -> Can change password, delete account, logout~~
+ ~~Set up login process - have traditional login (email + password)~~
+ ~~Split up profile page into container/component structure~~
+ ~~Form validation (author, title, rating, date included)~~
+ ~~Delete Books (delete reflected on db as well)~~
+ ~~Only show log in/sign up side of navbar if not logged in -> Have profile link instead?~~
+ ~~on delete make user enter their password before deleting.~~
+ ~~Error display for login and register. If non matching passwords, incorrect password, email already exists~~