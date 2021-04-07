const { model, Schema } = require("mongoose");

const CertificateSchema = new Schema({
  student_name: { type: String, required: true },
  father_name: { type: String, required: true },
  student_type: { type: String, enum: ["Regular", "Compart", "C.C"] },
  passing_year: { type: Number, required: true, min: 2000 },
  student_roll: { type: String, required: true },
  student_number: { type: String, required: true },
  student_grade: { type: String, required: true },
  iss_date: { type: String, required: true },
});

const Certificate = new model("Certificate", CertificateSchema);

module.exports = {
  Certificate,
};
