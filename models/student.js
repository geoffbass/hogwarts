const Sequelize = require('sequelize');
const db = require('./db');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true 
    }
  }, 
  bio: Sequelize.TEXT
}, {
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
  },
  hooks: {
    beforeCreate: function (student) {
      if (!student.houseId) {
        student.houseId = Math.ceil(Math.random() * 4); 
      } 
    } 
  },
  instanceMethods: {
    grantPoints: function (numPoints) {
      return this.getHouse()
      .then(house => {
        console.log(house.name);
        console.log(house.points);
        return house.update({
          points: house.getDataValue('points') + numPoints 
        });
      });
    } 
  }
});

module.exports = Student;
