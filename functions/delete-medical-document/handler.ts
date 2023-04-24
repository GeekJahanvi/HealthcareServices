/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const DeleteMedicalDocument = require('../../src/controllers/delete-medical-document');

module.exports = function (req: any, res: any, _next: any) {
  return DeleteMedicalDocument(req, res);
};

export {
  
}