const { Router } = require('express');
const routeControllers = require("./controller/routeTemperament")
const router = Router();

router.get('/', routeControllers.index);

module.exports = router;
