const joi = require("joi");

const studentSchema = joi.object({
  /*Some Schema */
  student_name: joi.string().required(),
  student_father_name: joi.string().required(),
});

module.exports.studentSchema = studentSchema;
