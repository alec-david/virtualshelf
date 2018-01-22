# TODO
+ Set up JWT (JSON Web Token) client and server side
  + Implement JWT with [Spring Boot](https://github.com/gothinkster/spring-boot-realworld-example-app)
  + Tutorial for JWT on Spring Boot [HERE](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)
  + JWT with [React/Redux](https://github.com/gothinkster/react-redux-realworld-example-app)
  + [JWT Node Library](https://github.com/auth0/node-jsonwebtoken)
+ Set up redux-form for login/register pages.
+ Set up login process - have traditional login with email + add google + fb (maybe twitter, github, etc)
+ Once login process setup, get user id working where only shows items where user id === current user id
+ Switch async promise hydrate stuff to use redux-thunk
+ Add edit functionality to books
+ Create profile page -> Can change password, delete account
+ Look into caching login status so don't have to login everytime (No idea how to do this - maybe look into cookies/see if an easy solution with JWT)
  + Article on storing JWTs [HERE](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
+ Split up profile page into container/component structure

Front End Stuff
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
+ ~~Only show log in/sign up side of navbar if not logged in -> Have profile link instead?~~