const { Router } = require('express');
const dogsController = require("./controller/routeDog")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/", dogsController.indexAndName); 
router.get("/:id", dogsController.indexId);
router.post("/", dogsController.indexCreate);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
