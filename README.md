# Hogwarts

This is a simple Express/Sequelize backend for demonstrating the following concepts:
- initializing and setting up a simple server with a database
- Express routing and middleware
- using Sequelize to define models and generate SQL queries
- using Promises in conjunction with server routing

The example uses a seed script with students and houses from Harry Potter to establish a starting point. From there, start the server, add some more students, assign them points, and determine a House Cup winner!

The code in this repository should be considered a rough goal for starting from scratch (empty directory) and working through creating a simple backend step-by-step. This can be accomplished with the following workflow:

- npm init
  - look at bare-bones package.json
  - add start script: "nodemon app.js"
- create app.js file
  - require express, install and save, initialize app
  - tell app to listen on 1337
  - try pinging server from browser, Cannot GET, how do we know it's working?
  - set up logging middleware, install/save/use volleyball
  - `app.get('/', (req, res) => res.send('Welcome to Hogwarts'));`

- create 'models' directory, w/ index and db files
- in db.js, require/save/install sequelize/pg/pg-hstore, initialize db
  - psql: `create database hogwarts;`
  - export db
- create house.js and student.js files
  - define and export House model
  - define and export Student model
- define associations in index.js
- copy seed.js file and run, show db after

- define student birthdate virtual
- define student instance method
- define student beforeCreate hook

- define house class method: getHouseCupLeader

- define GET /students and GET /houses in app.js
- refactor to use separate route files
- use query filtering with where and include

- define error handling middleware in app.js:
  - talk about function.length and invoking next(err)

- define GET /students/:studentId
- define POST /students
  - body-parsing middleware
  - show Postman or curl

- define GET /houses/leader
  - use class method
