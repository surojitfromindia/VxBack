const router = require("express").Router();
const { Register } = require("../../controllers/student");

router.get("/", (req, res) => {
  res.send("all student");
});

router.post("/new", (req, res) => {
  let body = req.body;
  Register(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err.details[0].message);
    });
});

module.exports.studenrouter = router;
