const express = require("express");
const cors = require("cors");
const { apienrouter } = require("./routers/API/api");
const { Connect } = require("./controllers/mongooseConnect");
const { GenratePdf } = require("./controllers/generatepdf");
const app = express();
//middlewares
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const main = async () => {
  await Connect();

  //routers
  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.use("/api", apienrouter);

  app.get("/sd", (req, res) => {
    let student = {
      student_name: "Surojit Paul",
      father_name: "Ram Kumar Paul",
      student_type: "Regular",
      passing_year: 2021,
      student_roll: "709932N",
      student_number: "0028",
      student_grade : "A",
      iss_date : "22/3/2020"
    };
    res.render("./billtemplate.ejs", { student: student });
  });

  app.get("/download", async (req, res) => {
    GenratePdf(req, res);
  });
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started");
  });
};

main();
