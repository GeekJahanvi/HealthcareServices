/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const ResetPassword = require('../../src/controllers/reset-password');

module.exports = function (req: any, res: any, next: any) {
  return ResetPassword(req, res);
};

export {
  
}