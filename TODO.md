# Bugs:
+ Bug in title/author/director sort caused by comparing lowercase/uppercase (normalize strings before sorting)

# Refactor TODO:
+ Pull dynamic colNum calculation into method in VisibleXList
Components that can be reused across all 3:
+ BookList (maybe - would need to check if I can pass component down dynamically -- might be more trouble then its worth) (Also pull add new logic up into visiblebooklist then can just pass that down)
+ When no cards available. Display some kinda message instead of search + filter
+ Break up long strings in description (on card)
+ switch getBooks/getUserBooks so they return JSON object w/ type...
+ AddBook - move constants out of container

# TODO
+ Reduce number of calls to reducers when loading/reloading lists of items
+ Clear Search on page change (or maintain it)
+ When no cards available. Display some kinda message instead of search + filter
+ Add Dynamic resizing of nav bar -> Should turn into hamburger menu for small screens.
+ When adding new card, insert where it belongs in regards to date. (most recent date should be first)
+ toast on login/logout.
+ Lazy loading of items (client side) (should I pull all books down and then lazily display -- research)
+ Switch async promise hydrate stuff to use redux-thunk
+ Display useful links in errors (ex: if registering and email exists, link to login page. If logging in and email does not exist, link to register.)
+ Create microservice that gets cover/image for each entry (would be a good use for Go)
+ Unit testing

# Front End Stuff
+ add padding to everything (cards, search, filter - make everything pop more)
+ Item on right of screen has dropdown menu cut off on settings click
+ Styling...

# Completed
+ ~~Change dateRead/date_read and dateWatched/date_watched to generic date. Update express and db to accept this param~~
+ ~~Add Search and filter to main page~~
+ ~~General page when not logged in -> shows all recent entries (across all 3 options)~~
+ ~~General page when logged in -> Shows all recent entries for current user~~
+ ~~Bug - items keep on loading when you go to that screen. Prevent loading once initial load done.~~
+ ~~refactor actions into seperate actions (user, book, movie, tv)~~
+ ~~CardContent - pull settings into individual component~~
+ ~~FilterBookDropdown -> FilterDropdown~~
+ ~~SearchBooks/SearchMovies.js (just pass in type (books, movies) for placeholder text)~~
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