const { studentSchema } = require("../validation/student");

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

module.exports = {
  Register: NewStudent,
};
