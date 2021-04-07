const { studentSchema } = require("../validation/student");
const { Certificate } = require("../models/Student");
const { Promise } = require("mongoose");

function NewStudent(data) {
  //data will be a json object
  let ans = studentSchema.validate(data);
  return new Promise((resolve, reject) => {
    //resolve is there is no validation error
    if (!("error" in ans)) resolve(ans.value);
    //reject with error message of the validation
    //error if any
    else reject(ans.error);
  });
}
function GetCertificate(roll, number) {
  return new Promise((resolve, reject) => {
    Certificate.findOne(
      { student_roll: roll, student_number: number },
      { __v: 0, _id: 0 },
      (err, certificate) => {
        if (!err) resolve(certificate);
        else reject(new Error(err));
      }
    );
  });
}
function GetAllCertificate() {
  return new Promise((resolve, reject) => {
    Certificate.find({}, { __v: 0, _id: 0 }, (err, certificate) => {
      if (!err) resolve(certificate);
      else reject(new Error(err));
    });
  });
}

function CreateCertificate(data) {
  const info = data;
  const studentCertificate = new Certificate(info);
  return new Promise((resolve, reject) => {
    studentCertificate.save((err, certificate) => {
      if (!err) resolve(certificate);
      else reject(new Error(err));
    });
  });
}

module.exports = {
  Register: NewStudent,
  CreateCertificate,
  GetCertificate,
  GetAllCertificate
};
