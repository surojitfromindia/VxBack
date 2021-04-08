const router = require("express").Router();
const ejs = require("ejs");
const { GenratePdf } = require("../../controllers/generatepdf");

router.get("/certificate", (req, res) => {
  GenratePdf(req, res);
});

module.exports.downloadRouter = router;
