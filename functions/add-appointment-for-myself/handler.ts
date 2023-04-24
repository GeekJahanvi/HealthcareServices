/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AddAppointmentForMyself = require('../../src/controllers/add-appointment-for-myself');

module.exports = function (req: any, res: any, _next: any) {
  return AddAppointmentForMyself(req, res);
};

export {
  
}