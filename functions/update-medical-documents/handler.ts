/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const UpdateMedicalDocuments = require('../../src/controllers/update-medical-documents');

module.exports = function (req: any, res: any, next: any) {
  return UpdateMedicalDocuments(req, res);
};

export {
  
}