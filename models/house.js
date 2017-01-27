const Sequelize = require('sequelize');
const db = require('./db');

const House = db.define('house', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true 
    }
  }, 
  mascot: {
    type: Sequelize.STRING 
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
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
});

module.exports = House;
