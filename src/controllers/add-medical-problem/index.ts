/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import Common from '../../commons';
import Mutations from '../../graphql/medical_history/mutations';
import Cloudinary from '../../../helpers/cloudinary';

interface AddMedicalProblemRequestBody {
    input?: {
        input?: {
            objects: [MedicalProblems];
            objects1: [Medication]
        };
    };
}

type MedicalProblems = {
    medical_problem_id: string;
    user_id: string;
}

type Medication = {
    medication_id: string;
    user_id: string;
}

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

async function addMedicalProblem(
    resultMedicalProblemArray: any,
    resultMedicationArray: any
) {
    const { data, error } = await Common.createAction(
        {
            objects: resultMedicalProblemArray,
            objects1: resultMedicationArray
        },
        Mutations.ADD_MEDICAL_PROBLEMS,
        'insert_medical_problems'
    );

    return { addMedicalProblemData: data, addMedicalProblemError: error };
}

async function addMedication(
    resultMedicalProblemArray: any,
    resultMedicationArray: any
) {
    const { data, error } = await Common.createAction(
        {
            objects: resultMedicalProblemArray,
            objects1: resultMedicationArray
        },
        Mutations.ADD_MEDICAL_PROBLEMS,
        'insert_user_medications'
    );

    return { addMedictionData: data, addMedictionError: error };
}

async function addCommonMedicalProblem(
    newMedicalProblemArray: any
) {
    const { data, error } = await Common.createAction({
        newsmedicalproblemarray: newMedicalProblemArray
    },
        Mutations.ADD_COMMON_MEDICAL_PROBLEMS,
        'insert_common_medical_problems'
    );

    return { commonMedicalProblemData: data, commonMedicalProblemError: error }
}

async function addCommonMedications(
    newMedicationArray: any
) {
    const { data, error } = await Common.createAction({
        newmedicationarray: newMedicationArray
    },
        Mutations.ADD_COMMON_MEDICAL_MEDICATIONS,
        'insert_common_medications'
    );

    return { commonMedicationsData: data, commonMedicationsError: error }
}

const AddMedicalProblems = {
    async handle(req: Request, res: Response) {
        try {

            const { objects, objects1 } =
                (req.body as AddMedicalProblemRequestBody)?.input?.input || req?.body?.input || req?.body;

            let newMedicalProblemArray = [];

            const filterMedicalProblemNew = objects.filter(
                (medicalProblem: any) =>
                    medicalProblem.medical_problem_id === medicalProblem.common_medical_problems
            );

            console.log(filterMedicalProblemNew, '76');

            let commonMedicalProblemDataResponse = [];
            if (filterMedicalProblemNew.length > 0) {
                newMedicalProblemArray = filterMedicalProblemNew.map(
                    (medicalProblemNew: { medical_problem_id: any; }) => {
                        return { common_medical_problems: medicalProblemNew.medical_problem_id };
                    }
                );
                console.log(newMedicalProblemArray, '844');

                const { commonMedicalProblemData, commonMedicalProblemError } = await addCommonMedicalProblem(newMedicalProblemArray);

                commonMedicalProblemDataResponse = commonMedicalProblemData.returning[0];

            }
            console.log(commonMedicalProblemDataResponse, '81');

            const existingMedicalProblem = objects
                .filter(
                    (medicalProblem: any) =>
                        medicalProblem.medical_problem_id !== medicalProblem.common_medical_problems
                )
                .map((medicalProblem: { user_id: any; medical_problem_id: any; }) => {
                    return {
                        user_id: medicalProblem.user_id,
                        medical_problem_id: medicalProblem.medical_problem_id
                    };
                });
            const resultMedicalProblemArray = [
                ...existingMedicalProblem,
                ...newMedicalProblemArray.map((medicalProblem: any) => {
                    return {
                        user_id: objects[0].user_id,
                        medical_problem_id: medicalProblem.id
                    };
                })
            ];

            //for medication



            let newMedicationArray = [];


            const filterMedicationNew = objects1.filter(
                (medication: any) => medication.medication_id === medication.common_medications
            );

            console.log(filterMedicationNew);

            let commonMedicationDataResponse = [];

            if (filterMedicationNew.length > 0) {
                newMedicationArray = filterMedicationNew.map(
                    (medicationNew: { medication_id: any; }) => {
                        return { common_medications: medicationNew.medication_id };
                    }
                );
                const { commonMedicationsData, commonMedicationsError } = await addCommonMedications(newMedicationArray);

                commonMedicationDataResponse = commonMedicationsData.returning[0];
            }
            const existingMedication = objects1
                .filter((medication: any) => medication.medication_id !== medication.common_medications)
                .map((medication: any) => {
                    return {
                        user_id: medication.user_id,
                        medication_id: medication.medication_id
                    };
                });
            // console.log(newMedicationArray, '136', existingMedication);

            const resultMedicationArray = [
                ...existingMedication,
                ...newMedicationArray.map((medication: any) => {
                    return {
                        user_id: objects1[0].user_id,
                        medication_id: medication.id
                    };
                })
            ];
            // console.log(resultMedicationArray, '138');

            const { addMedicalProblemData, addMedicalProblemError } = await addMedicalProblem(resultMedicalProblemArray, resultMedicationArray)


            console.log(addMedicalProblemData, "line198");

            const { addMedictionData, addMedictionError } = await addMedication(resultMedicalProblemArray, resultMedicationArray)


            console.log(addMedictionData, "line219");

            if (addMedicalProblemError) {
                return res.status(500).json({ status: false, message: 'medical problem not added.' });
            }

            // const resultData = [];
            // resultData.push(addMedicalProblemData.returning[0]);
            // resultData.push(addMedictionData.returning[0]);
            // console.log(resultData, "line228");

            const resultData: any = {};
            resultData.medPro = addMedicalProblemData.returning;
            resultData.medication = addMedictionData.returning;


            return res.status(200).json({
                status: true,
                message: `document is added`,
                data: resultData
            });
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = AddMedicalProblems.handle;