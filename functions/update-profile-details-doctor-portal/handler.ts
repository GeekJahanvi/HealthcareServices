/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const UpdateProfileDetails = require('../../src/controllers/update-profile-details-doctor-portal');

module.exports = function (req: any, res: any, next: any) {
  return UpdateProfileDetails(req, res);
};

export {
  
}