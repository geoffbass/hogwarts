const db = require('./db');

const House = require('./house');
const Student = require('./student');

Student.belongsTo(House);
House.hasMany(Student, {as: 'Members'});

module.exports = db;
