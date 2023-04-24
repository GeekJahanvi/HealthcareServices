/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const GetUpcomingAppointmentMemberPortal = require('../../src/controllers/get-upcoming-appointment-member-portal');

module.exports = function (req: any, res: any, next: any) {
  return GetUpcomingAppointmentMemberPortal(req, res);
};

export {
  
}