# NOTES APP FRONT END

Hi there and welcome!

This is the front end of the note taking app. Allows the user to create, edit and delete notes.

It is from the [fullstackopen] course that is offered by the Univesity of Helsinki.

<br />

## Technologies used in building the app

- The app (at least the front end) is built entirely using react. React offers the ability to code components that manage their
 own state and later combine them to design the complete user interface.
- The linter used for code consistency is eslint.(God this was a pain in the ass when your not consistent with your coding style). It
made it easier to find bugs caused by typo's instead of spending the whole day searching for the missing curly bracket.
- The unit tests are performed using JEST (yay! Facebook). As the landing page suggests the it is a delightful testing framework with a focus on simplicity.
- End to end testing was performed using Cypress. It is much more bearable to get it running compared to other e2e testing frameworks.
- There are also dependancies that deserve honourable mentions.

  - [axios] as the HTTP client for making requests and receiving responses to and from the backend, because it is much more intuitive to use compared to the default fetch.
  - [jsonwebserver] in the beginning the front end had no server, this development dependacy acted as a simple JSON server.
  - [prop-types] to make sure that the type of a component's prop is defined and is of the correct type. Made sure that none of the props were left unnamed.

<br />

## Running the application locally

I do not oftenly push this code to the the heroku master and deploy it to the internet so here are the instructions for running the app locally.

- Make sure you have node and git installed and are familiar with the basics of how both work.
- clone this repository.
- change directory into the notes app directory.
- Install all the required node modules. Dependacies and what not.
- Start the front end using the npm script. Make sure also that you have the [notes_app] back end server running too.

                      git clone https://github.com/jim4067/notes_app_frontend.git
                      cd notes_app_front_end
                      npm i
                      npm start

  <br />

This is the end but thanks for taking the time to read.
The url to the web app is at [notes app link]

<br />
<br />

[fullstackopen]: https://fullstackopen.com
[axios]: https://github.com/axios/axios
[jsonwebserver]: https://github.com/typicode/json-server
[prop-types]: https://github.com/facebook/prop-types
[notes_app]: https://github.com/jim4067/notes_app
[notes app link]: https://nameless-mountain-32216.herokuapp.com/
