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
  - `const db = new Sequelize('postgres://localhost:5432/hogwarts');`
  - psql: `create database hogwarts;`
  - export db
- create house.js and student.js files
  - define and export House model:
```
		const House = db.define('house', {
  		name: {
    		type: Sequelize.STRING,
    		allowNull: false,
    		validate: {
     		notEmpty: true
    		}
  		},
  		mascot: Sequelize.STRING
  		points: {
    		type: Sequelize.INTEGER,
    		defaultValue: 0
  		}
		});
```
  - define and export Student model:
```
		const Student = db.define('student', {
  		name: {
    		type: Sequelize.STRING,
    		allowNull: false,
    		validate: {
     		notEmpty: true
    		}
  		},
  		bio: Sequelize.TEXT
		});
```
- define associations in index.js:
```
		const db = require('./db');
		
		const House = require('./house');
		const Student = require('./student');
		
		Student.belongsTo(House);
		House.hasMany(Student, {as: 'Members'});
		
		module.exports = db;
```
- copy seed.js file and run, show db after

-define student birthdate virtual:
```
  	getterMethods: {
    	birthdate: function () {
      	if (this.bio) {
       		const bornOn = this.bio.match(/b\.\s+([\,\s\w]+)/);
					if (bornOn && bornOn[1]) {
						return bornOn[1];
					}
				}
				return null;
			}
  	}
```
- define student instance method:
```
  	instanceMethods: {
    	grantPoints: function (numPoints) {
				return this.getHouse()
				.then(house => {
					return house.update({
						points: house.getDataValue('points') + numPoints
					});
				});
    	}
  	}
```
- define student hook:
  	hooks: {
    	beforeCreate: function (student) {
     		if (!student.houseId) {
     			student.houseId = Math.ceil(Math.random() * 4);
     		}
    	}
  	},

  - define house class method:
  classMethods: {
    getHouseCupLeader: function () {
     	return this.findAll()
     	.then(houses => {
     		return houses.reduce((prevLeader, house) => {
      		return house.points > prevLeader.points ? house
                    															: prevLeader;
     		});
     	});
    }
  }

  - define GET /students and GET /houses in app.js
  - refactor to use separate route files
  - use query filtering with where and include

  - define error handling middleware in app.js:
		app.use((err, req, res, next) => {
			console.error(err.stack);
  		res.status(err.status || 500)
  		.send(err.message || 'Oops. Something went wrong.');
		});
  - talk about function.length and invoking next(err)

  - define GET /students/:studentId
  - define POST /students
    - body-parsing middleware
    - show Postman

  - define GET /houses/leader
    - use class method
