const express = require('express');
const router = express.Router();

const House = require('../models/house');
const Student = require('../models/student');

router.get('/', (req, res, next) => {
  Student.findAll({
    where: req.query,
    include: [House]
  })
  .then(res.json.bind(res))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(res.status(201).json.bind(res))
  .catch(next);
});

router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
  .then(res.json.bind(res))
  .catch(next);
});

router.post('/:studentId/points', (req, res, next) => {
  console.log(req.query);
  Student.findById(req.params.studentId)
  .then(student => student.grantPoints(+req.query.numpoints))
  .then(res.sendStatus.bind(res, 200))
  .catch(next);
});

module.exports = router;
