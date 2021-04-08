const express = require("express");
const path = require("path");
const cors = require("cors");
const { apirouter } = require("./routers/API/api");
const { Connect } = require("./controllers/mongooseConnect");
const app = express();
const { GetCertificate } = require("./controllers/student");
const { genWord } = require("./controllers/generateCertificateWord");
//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const main = async () => {
  Connect();

  //routers
  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.use("/api", apirouter);

  app.get("/certificate", (req, res) => {
    let roll = req.query.roll;
    let number = req.query.number;
    GetCertificate(roll, number)
      .then((certificate) => {
        res.render("./billtemplate.ejs", { student: certificate });
      })
      .catch((err) => res.send("not found"));
  });

  app.get("/file", (req, res) => {
    let roll = req.query.roll;
    let number = req.query.number;
    GetCertificate(roll, number)
      .then((certificate) => {
        genWord(certificate, res);
      })
      .catch((err) => res.send("not found"));
  });
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started");
  });
};

main();
