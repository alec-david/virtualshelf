# TODO
+ Set up login process - have traditional login with email + add google + fb (maybe twitter, github, etc)
+ Add user info to state (state.user: {userid: -1} if not logged in. {userid: 5} if logged in)
+ Only show log in/sign up side of navbar if not logged in -> Have profile link instead?
+ Once login process setup, get user id working where only shows items where user id === current user id
+ Switch async promise hydrate stuff to use redux-thunk
+ Add edit functionality

+ General page when not logged in -> shows all recent entries (across all 3 options)
+ General page when logged in -> Shows all recent entries for current user
+ Once all that is working, implement for tv and movies.
+ Unit testing
+ Refactoring (AddBook - move constants out of container, clean up hard coded select with 10 options)
+ Styling...(Improve delete functionality)

# QoL Improvements
+ Create microservice that gets cover/image for each entry (would be a good use for Go)
+ Create star system for ratings instead of number dropdown

# Completed
+ ~~Form validation (author, title, rating, date included)~~
+ ~~Delete Books (delete reflected on db as well)~~