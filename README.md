## Uptime Monitor

RESTful API for monitoring uptime of a given URL in NodeJS. The user can enter URLs that you want to monitor, and receive alerts via SMS when the URLs go down or come back online.

- The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE, and HEAD.
- The API allows a client to connect, then create a new user, and edit or delete that user.
- The API allows a user to sign in which gives them a token that they can use for subsequent authenticated requests.
- The API allows the user to sign out which invalidates their token.
- The API allows a signed in user to use their token to create a new "check" a task given to "monitor" a specific URL if its up or down.
- The API allows the signed in user to edit any of their "checks" up to 5 active at one time.
- In the background, workers perform all the "checks" at appropriate times,, and send alerts to the users when a check changes its state from up to down, or visa versa.
