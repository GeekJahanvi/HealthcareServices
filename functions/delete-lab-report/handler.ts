/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const DeleteLabReport = require('../../src/controllers/delete-lab-report');

module.exports = function (req: any, res: any, _next: any) {
  return DeleteLabReport(req, res);
};

export {
  
}