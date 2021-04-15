const fs = require("fs/promises");
const { createReport } = require("docx-templates");
const { func } = require("joi");
function genWord(body, res) {
  fs.readFile(__dirname + "/cctemplate.docx").then((buff) => {
    function formateData() {
      let issD = body.iss_date.split("-");
      let temp = issD[0];
      issD[0] = issD[2];
      issD[2] = temp;
      return issD.join("/");
    }

    createReport({
      template: buff,
      data: {
        student_name: body.student_name,
        father_name: body.father_name,
        student_type: body.student_type,
        passing_year: body.passing_year,
        student_roll: body.student_roll,
        student_number: body.student_number,
        student_grade: body.student_grade,
        iss_date: formateData(),
        serial_no: body.serial_no,
      },
      cmdDelimiter: ["{", "}"],
    }).then((wbuff) => {
      fs.writeFile(__dirname + "/report.docx", wbuff).then(() => {
        res.download(__dirname + "/report.docx");
      });
    });
  });
}

module.exports = {
  genWord,
};
