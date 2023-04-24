/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AddImageReport = require('../../src/controllers/add-image-report');

module.exports = function (req: any, res: any, next: any) {
  return AddImageReport(req, res);
};

export {
  
}