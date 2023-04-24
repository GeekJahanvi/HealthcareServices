"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commons_1 = __importDefault(require("../../commons"));
const mutations_1 = __importDefault(require("../../graphql/medical_history/mutations"));
// interface MedicalProblemsData {
//   returning: {
//     id: string;
//     user_id: string;
//     document_name: string;
//     document_url: string;
//     document_public_id: string;
//     created_at: string;
//     updated_at: string;
//   }[];
// }
// interface MedicalDocumentError {
//   message: string;
// }
// interface AddMedicalDocumentResponse {
//   status: boolean;
//   message: string;
//   data?: MedicalDocumentData['returning'][0];
// }
function addMedicalProblem(resultMedicalProblemArray, resultMedicationArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            objects: resultMedicalProblemArray,
            objects1: resultMedicationArray
        }, mutations_1.default.ADD_MEDICAL_PROBLEMS, 'insert_medical_problems');
        return { addMedicalProblemData: data, addMedicalProblemError: error };
    });
}
function addMedication(resultMedicalProblemArray, resultMedicationArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            objects: resultMedicalProblemArray,
            objects1: resultMedicationArray
        }, mutations_1.default.ADD_MEDICAL_PROBLEMS, 'insert_user_medications');
        return { addMedictionData: data, addMedictionError: error };
    });
}
function addCommonMedicalProblem(newMedicalProblemArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            newsmedicalproblemarray: newMedicalProblemArray
        }, mutations_1.default.ADD_COMMON_MEDICAL_PROBLEMS, 'insert_common_medical_problems');
        return { commonMedicalProblemData: data, commonMedicalProblemError: error };
    });
}
function addCommonMedications(newMedicationArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            newmedicationarray: newMedicationArray
        }, mutations_1.default.ADD_COMMON_MEDICAL_MEDICATIONS, 'insert_common_medications');
        return { commonMedicationsData: data, commonMedicationsError: error };
    });
}
const AddMedicalProblems = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { objects, objects1 } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                let newMedicalProblemArray = [];
                const filterMedicalProblemNew = objects.filter((medicalProblem) => medicalProblem.medical_problem_id === medicalProblem.common_medical_problems);
                console.log(filterMedicalProblemNew, '76');
                let commonMedicalProblemDataResponse = [];
                if (filterMedicalProblemNew.length > 0) {
                    newMedicalProblemArray = filterMedicalProblemNew.map((medicalProblemNew) => {
                        return { common_medical_problems: medicalProblemNew.medical_problem_id };
                    });
                    console.log(newMedicalProblemArray, '844');
                    const { commonMedicalProblemData, commonMedicalProblemError } = yield addCommonMedicalProblem(newMedicalProblemArray);
                    commonMedicalProblemDataResponse = commonMedicalProblemData.returning[0];
                }
                console.log(commonMedicalProblemDataResponse, '81');
                const existingMedicalProblem = objects
                    .filter((medicalProblem) => medicalProblem.medical_problem_id !== medicalProblem.common_medical_problems)
                    .map((medicalProblem) => {
                    return {
                        user_id: medicalProblem.user_id,
                        medical_problem_id: medicalProblem.medical_problem_id
                    };
                });
                const resultMedicalProblemArray = [
                    ...existingMedicalProblem,
                    ...newMedicalProblemArray.map((medicalProblem) => {
                        return {
                            user_id: objects[0].user_id,
                            medical_problem_id: medicalProblem.id
                        };
                    })
                ];
                //for medication
                let newMedicationArray = [];
                const filterMedicationNew = objects1.filter((medication) => medication.medication_id === medication.common_medications);
                console.log(filterMedicationNew);
                let commonMedicationDataResponse = [];
                if (filterMedicationNew.length > 0) {
                    newMedicationArray = filterMedicationNew.map((medicationNew) => {
                        return { common_medications: medicationNew.medication_id };
                    });
                    const { commonMedicationsData, commonMedicationsError } = yield addCommonMedications(newMedicationArray);
                    commonMedicationDataResponse = commonMedicationsData.returning[0];
                }
                const existingMedication = objects1
                    .filter((medication) => medication.medication_id !== medication.common_medications)
                    .map((medication) => {
                    return {
                        user_id: medication.user_id,
                        medication_id: medication.medication_id
                    };
                });
                // console.log(newMedicationArray, '136', existingMedication);
                const resultMedicationArray = [
                    ...existingMedication,
                    ...newMedicationArray.map((medication) => {
                        return {
                            user_id: objects1[0].user_id,
                            medication_id: medication.id
                        };
                    })
                ];
                // console.log(resultMedicationArray, '138');
                const { addMedicalProblemData, addMedicalProblemError } = yield addMedicalProblem(resultMedicalProblemArray, resultMedicationArray);
                console.log(addMedicalProblemData, "line198");
                const { addMedictionData, addMedictionError } = yield addMedication(resultMedicalProblemArray, resultMedicationArray);
                console.log(addMedictionData, "line219");
                if (addMedicalProblemError) {
                    return res.status(500).json({ status: false, message: 'medical problem not added.' });
                }
                // const resultData = [];
                // resultData.push(addMedicalProblemData.returning[0]);
                // resultData.push(addMedictionData.returning[0]);
                // console.log(resultData, "line228");
                const resultData = {};
                resultData.medPro = addMedicalProblemData.returning;
                resultData.medication = addMedictionData.returning;
                return res.status(200).json({
                    status: true,
                    message: `document is added`,
                    data: resultData
                });
            }
            catch (e) {
                return res.status(500).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = AddMedicalProblems.handle;
//# sourceMappingURL=index.js.map