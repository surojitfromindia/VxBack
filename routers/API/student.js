const router = require("express").Router();
const {
  Register,
  CreateCertificate,
  GetCertificate,
} = require("../../controllers/student");

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

router.get("/certificate", (req, res) => {
  console.log("Whoo");
  let roll = req.query.roll;
  let number = req.query.number;
  GetCertificate(roll, number)
    .then((certificate) => {
      res.send(certificate);
    })
    .catch((err) => res.send(err));
});

router.post("/certificate/new", (req, res) => {
  let body = req.body;
  CreateCertificate(body).then((result) => {
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  let student = {
    name: `${req.params.id}`,
  };
  res.render("billtemplate.ejs", { student: student });
});

router.post("/:id/delete", async (req, res) => {
  let student = {
    name: `${req.params.id}`,
  };
  res.send(`${student.name} is deleted`);
});

module.exports.studenrouter = router;
