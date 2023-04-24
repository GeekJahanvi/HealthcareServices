/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const GetPastAppointmentMemberPortal = require('../../src/controllers/get-past-appointment-member-portal');

module.exports = function (req: any, res: any, next: any) {
  return GetPastAppointmentMemberPortal(req, res);
};

export {
  
}