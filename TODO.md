# TODO
+ Form validation (author, title, rating, date included)
+ Set up login process - have traditional login with email + add google + fb (maybe twitter, github, etc)
+ Add user info to state (state.user: {userid: -1} if not logged in {userid: 5} if logged in)
+ Only show log in/sign up side of navbar if not logged in -> Have profile link instead?
+ Once login process setup, get user id working where only shows items where user id === current user id

+ General page when not logged in -> shows all recent entries (across all 3 options)
+ General page when logged in -> Shows all recent entries for current user
+ Once all that is working, implement for tv and movies.
+ Unit testing

# QoL Improvements
+ Create microservice that gets cover/image for each entry (maybe in Go???)
+ Create star system for ratings instead of number dropdown

# Completed
+ ~~Delete Books (delete reflected on db as well)~~