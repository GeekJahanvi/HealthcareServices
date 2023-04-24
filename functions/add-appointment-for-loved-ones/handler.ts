/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AddAppointmentForLovedOnes = require('../../src/controllers/add-appointment-for-loved-ones');

module.exports = function (req: any, res: any, next: any) {
  return AddAppointmentForLovedOnes(req, res);
};

export {
  
}