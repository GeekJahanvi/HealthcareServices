/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const VerifyUser = require('../../src/controllers/verify-user');

module.exports = function (req: any, res: any, next: any) {
  return VerifyUser(req, res);
};

export {
  
}