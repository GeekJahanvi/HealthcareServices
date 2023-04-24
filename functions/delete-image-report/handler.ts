/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const DeleteImageReport = require('../../src/controllers/delete-image-report');

module.exports = function (req: any, res: any, _next: any) {
  return DeleteImageReport(req, res);
};

export {
  
}