var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/rankingController");

router.post("/obter", function (req, res) {
    usuarioController.obter(req, res);
})

module.exports = router;