const router = require("express").Router();
const {
  Register,
  CreateCertificate,
  GetCertificate,
  GetAllCertificate,
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

//return all ceritficates
router.get("/certificates", (req, res) => {
  GetAllCertificate()
    .then((certificate) => {
      res.send(certificate);
    })
    .catch((err) => res.send(err));
});

//return one ceritficate values
router.get("/certificate", (req, res) => {
  let roll = req.query.roll;
  let number = req.query.number;
  GetCertificate(roll, number)
    .then((certificate) => {
      res.send(certificate);
    })
    .catch((err) => res.send(err));
});
//add a new certificate value
router.post("/certificate/new", (req, res) => {
  let body = req.body;

  CreateCertificate(body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log({ err });
      res.status(400).send(err);
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
