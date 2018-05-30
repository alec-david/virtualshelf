# Refactor TODO:

* Break up long strings in description (on card) (get card width, insert line break every x character?)
* switch getBooks/getUserBooks so they return JSON object w/ type...
* for NewItemCard - move into components

# TODO

* see if i can get rid of redux-form and maybe others
* work on mobile view
* maybe add fixed nav bar. Have to create nav bar store (has activeItem, visibilty, etc)
* Look into not sending password to backend. (Encrypt first)
* Lazy loading of items (client side) (should I pull all books down and then lazily display -- research)
* Unit testing
* tweak movie and tv searching. Not very accurate

# Front End Stuff

* add padding to everything (cards, search, filter - make everything pop more)
* Get rid of inline styles
* Styling...

# Stretch TODOs (ordered from most to least likely to implement)

* add option to browse all items when logged in
* Switch add item to pop up in center and have larger text boxes
* add option to upload own image
* switch to downloading images off wikipedia. Use jimp or sharp.js to resize them all to standard size/form. Display that image
* Add some type of time limit on password reset token
* oAuth login with google/fb/twitter/github etc logins
* Switch async promise hydrate stuff to use redux-thunk
* Realllllly strech -> use brain.js to train neural network on books/ratings/users. Have that recommend other books

# Completed

* ~~set active item on start in nav bar~~
* ~~add nav bar active item set to store. Set that when doing router.history.replace/push~~
* ~~Item on right of screen has dropdown menu cut off on settings click~~
* ~~Style password validation of RegisterForm, ResetPasswordForm, ProfileResetPW~~
* ~~Add Dynamic resizing of nav bar -> Should turn into hamburger menu for small screens.~~
* ~~reduce toast duration~~
* ~~find better method to route between pages then router.history.replace - breaks back button~~
* ~~Cancel button on reset password page~~
* ~~Update settings so it doesn't say incorrect image when null image shown~~
* ~~add option to mark image incorrect (removes it, sets to default null image)~~
* ~~add search to main screen when not logged in~~
* ~~add title tag to images for books/tv~~
* ~~When deleting account, add option to delete all items as well~~
* ~~Add password/email validation (password should be at least x chars). Validate that passwords match and meet criteria client side~~
* ~~refactor registerForm, ProfileDelete, ProfileResetPW (DRY) (look at ResetPasswordForm)~~
* ~~auto focus on text boxes when applicable (deleting, creating, resetting, etc) and have enter hit button~~
* ~~Clicking Profile should always link back to default profile page~~
* ~~return verified field from backend. Set in user store.~~
  * ~~display verified checkbox on profile.~~
  * ~~for unverified users, show a button to resend verification email.~~
* ~~Add email confirmation (mailgun). Then add reset password link. Read up on SMTP~~
* ~~When adding new card, insert where it belongs in regards to current filter (date, title, etc)~~
* ~~toast on login/logout~~
* ~~When no cards available. Display some kinda message instead of search + filter~~
* ~~Add a message saying all cover images taken from Wikipedia~~
* ~~In title/author/director sort caused by comparing lowercase/uppercase (normalize strings before sorting)~~
* ~~Create functionality that gets cover/image for each entry~~
* ~~when initially loading movies, sort is run twice. Figure out why (occasionally causes bug. Books and tv only run once)~~
* ~~Pull dynamic colNum calculation into method in VisibleXList~~
* ~~Clear Search on page change~~
* ~~Change dateRead/date_read and dateWatched/date_watched to generic date. Update express and db to accept this param~~
* ~~Add Search and filter to main page~~
* ~~General page when not logged in -> shows all recent entries (across all 3 options)~~
* ~~General page when logged in -> Shows all recent entries for current user~~
* ~~Bug - items keep on loading when you go to that screen. Prevent loading once initial load done.~~
* ~~refactor actions into seperate actions (user, book, movie, tv)~~
* ~~CardContent - pull settings into individual component~~
* ~~FilterBookDropdown -> FilterDropdown~~
* ~~SearchBooks/SearchMovies.js (just pass in type (books, movies) for placeholder text)~~
* ~~Switch default filter to date read~~
* ~~Don't show current filter in dropdown~~
* ~~add settings options for logged out users. They can 'Hide' or 'Flag' (if offensive/bad content). Add flagged boolean to db. Don't display to all if flagged == T.~~
* ~~Filter books (client side) (filter by search title/author) (filter by date read/rating/title etc)~~
* ~~Create star system for ratings instead of number dropdown~~
* ~~Add edit functionality to books~~
* ~~Once login process setup, get user id working where only shows items where user id === current user id~~
* ~~Cached login status so don't have to login everytime (using localStorage)~~
* ~~Created profile page -> Can change password, delete account, logout~~
* ~~Set up login process - have traditional login (email + password)~~
* ~~Split up profile page into container/component structure~~
* ~~Form validation (author, title, rating, date included)~~
* ~~Delete Books (delete reflected on db as well)~~
* ~~Only show log in/sign up side of navbar if not logged in -> Have profile link instead?~~
* ~~on delete make user enter their password before deleting.~~
* ~~Error display for login and register. If non matching passwords, incorrect password, email already exists~~
