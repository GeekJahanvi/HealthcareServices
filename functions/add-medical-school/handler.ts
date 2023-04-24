/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AddMedicalSchool = require('../../src/controllers/add-medical-school');

module.exports = function (req: any, res: any, next: any) {
  return AddMedicalSchool(req, res);
};

export {
  
}