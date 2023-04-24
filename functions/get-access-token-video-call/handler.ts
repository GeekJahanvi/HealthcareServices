/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const GetAccessToken = require('../../src/controllers/get-access-token-video-call');

module.exports = function (req: any, res: any, next: any) {
  return GetAccessToken(req, res);
};

export {
  
}