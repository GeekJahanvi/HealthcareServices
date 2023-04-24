/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AddMedicalProblems = require('../../src/controllers/add-medical-problem');

module.exports = function (req: any, res: any, next: any) {
    return AddMedicalProblems(req, res);
};

export {
  
}