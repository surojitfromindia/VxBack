const fs = require("fs");
const puppeteer = require("puppeteer");

const storagePath = "./filestorage";
async function GenratePdf(req, res, templateData) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const webPage = await browser.newPage();
  await webPage.goto("http://localhost:5000/sd", {
    waitUntil: "networkidle0",
  });

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
