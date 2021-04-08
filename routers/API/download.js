const router = require("express").Router();
const { GenratePdf } = require("../../controllers/generatepdf");

router.get("/certificate", (req, res) => {
  GenratePdf(req, res);
});

module.exports.downloadRouter = router;
