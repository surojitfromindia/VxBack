const puppeteer = require("puppeteer");
async function GenratePdf(req, res) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const webPage = await browser.newPage();
  let roll = req.query.roll;
  let number = req.query.number;
  await webPage.goto(
    `http://localhost:5000/certificate?roll=${roll}&number=${number}`,
    {
      waitUntil: "networkidle0",
    }
  );

  const pdf = await webPage.pdf({
    format: "letter",
    path: "../filestorage",
  });

  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
}

module.exports = {
  GenratePdf,
};
