/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const DeleteMedicalSchool = require('../../src/controllers/delete-medical-school');

module.exports = function (req: any, res: any, _next: any) {
  return DeleteMedicalSchool(req, res);
};

export {
  
}