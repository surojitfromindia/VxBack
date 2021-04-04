const express = require("express");
const cors = require("cors");
const { apienrouter } = require("./routers/API/api");
const { Connect } = require("./controllers/mongooseConnect");

const { GenratePdf } = require("./controllers/generatepdf");
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {
  await Connect();

  //routers
  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.use("/api", apienrouter);

  app.get("/download", async (req, res) => {
    const tdata = { name: "Surojit Paul" };
    GenratePdf(req, res, tdata);
    // res.download(__dirname + `/filestorage/${tdata.name}info.pdf`);
  });
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started");
  });
};

main();
