const fs = require("fs");
const pdf = require("html-pdf");
const storagePath = "./src/filestorage";
function GenratePdf(req, res, templateData) {
  const htmlfile = fs.readFileSync("./controllers/uim.html", "utf-8");
  const options = { formate: "Letter" };
  pdf
    .create(htmlfile, options)
    .toFile(`${storagePath}/${templateData.name}info.pdf`, (err, doc) => {
      if (err) console.log(err);
      else {
        let docpath = doc.filename;
        res.download(docpath, (err) => {
          if (!err) fs.rmSync(docpath);
        });
      }
    });
}

module.exports = {
  GenratePdf,
};
