const { model, Schema } = require("mongoose");

const CertificateSchema = new Schema({
  student_name: {
    type: String,
    match: [
      /^[a-zA-Z\.]+(\s?[a-zA-Z\.]+)?\s[a-zA-Z]+$/i,
      "name must contain at least one space, and no number",
    ],
    required: [true, "Student name is required"],
    set: normalizename,
  },
  father_name: {
    type: String,
    match: [
      /^[a-zA-Z\.]+(\s?[a-zA-Z\.]+)?\s[a-zA-Z]+$/i,
      "name must contain at least one space, and no number",
    ],
    required: true,
    set: normalizename,
  },
  student_type: {
    type: String,
    match: [/(Regular|Compart|C\.C)/i, "Type does't match specified values"],
    enum: ["Regular", "Compart", "C.C"],
  },
  passing_year: { type: Number, required: true, min: 2000 },
  student_roll: { type: String, required: true },
  student_number: { type: String, required: true },
  student_grade: { type: String, required: true },
  iss_date: { type: String, required: true },
  serial_no: { type: String, required: true },
});

const Certificate = new model("Certificate", CertificateSchema);

module.exports = {
  Certificate,
};

function normalizename(names) {
  let nameparts = names.toLowerCase().split(" ");
  let j = nameparts.map((part) => {
    return part[0].toUpperCase() + part.substring(1);
  });
  return j.join(" ").trim();
}
