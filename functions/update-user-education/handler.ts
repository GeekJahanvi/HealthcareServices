/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const UpdateUserEducation = require('../../src/controllers/update-user-education');

module.exports = function (req: any, res: any, next: any) {
  return UpdateUserEducation(req, res);
};

export {
  
}