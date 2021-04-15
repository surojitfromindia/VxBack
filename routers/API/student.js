const router = require("express").Router();
const {
  Register,
  CreateCertificate,
  GetCertificate,
  GetAllCertificate,
  DeleteCertificateRecord,
} = require("../../controllers/student");
const {Certificate} = require('../../models/Student')

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

router.delete("/certificate/:id", (req, res) => {
  let id = req.params.id;
  DeleteCertificateRecord(id)
    .then((isdeleted) => {
      res.send(isdeleted);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

let bang = 0;
//event source
router.get("/certificate/:cuL", async (req, res) => {
  let cic = req.params.cuL;

  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  setInterval(() => {
    Certificate.countDocuments({}, (err, count) => {
      if (cic !== count) {
        bang++;
        if (cic < count)
          res.write(
            `data: ${JSON.stringify({
              state: "found",
              message: `${count - cic} ${
                count - cic === 1 ? "record" : "records"
              } found. Refresh the Page`,
            })}\nid :${bang}\n\n`
          );
        else if (cic > count)
          res.write(
            `data: ${JSON.stringify({
              state: "removed",
              message: `${cic - count} ${
                cic - count === 1 ? "record" : "records"
              } deleted. Refresh the Page`,
            })}\nid :${bang}\n\n`
          );
      }

      // res.write(`data: ${bang}\nid: ${bang}\n\n`);
    });
  }, 5000);
  req.on("close", () => {
    bang = 0;
    console.log("closed");
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
