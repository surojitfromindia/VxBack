const router = require("express").Router();
const { studenrouter } = require("./student");

router.use("/student", studenrouter);

module.exports.apienrouter = router;
