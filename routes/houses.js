const express = require('express');
const router = express.Router();

const House = require('../models/house');

router.get('/', (req, res, next) => {
  House.findAll()
  .then(res.json.bind(res))
  .catch(next);
});

router.get('/leader', (req, res, next) => {
  House.getHouseCupLeader()
  .then(res.json.bind(res))
  .catch(next);
});

module.exports = router;
