const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
const bodyParser = require('body-parser');

/************************* WEB SERVICES ********************************/

router.post('/v1/calculateAge', bodyParser.json(), function (req, res, next) {
    "use strict";
    controller.calculateAge(req, res, next);
});

router.get('/v1/getRequestorsCount', function (req, res, next) {
    "use strict";
    controller.getRequestorsCount(req, res, next);
});

/************************* WEB SERVICES *******************************/

module.exports = router;