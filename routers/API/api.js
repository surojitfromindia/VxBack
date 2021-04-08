const router = require("express").Router();
const { studenrouter } = require("./student");
const { downloadRouter } = require("./download");

router.use("/student", studenrouter);
router.use("/download", downloadRouter);

module.exports.apirouter = router;
