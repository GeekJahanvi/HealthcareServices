/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const LoginUser = require('../../src/controllers/login');

module.exports = function (req: any, res: any, next: any) {
  return LoginUser(req, res);
};

export {
  
}