/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import Mutations from '../../graphql/education/mutations';
import Common from '../../commons';
import Cloudinary from '../../../helpers/cloudinary';

interface AddMessageInput {
    input?: {
        input?: {
            objects: [UserLanguage];
        };
    };
}

type UserLanguage = {
    user_id: string;
    language_id: string;
}

// interface CloudinaryUploadResponse {
//   eager: { secure_url: string }[];
//   public_id: string;
// }

// interface MessageData {
//   returning: {
//     id: string;
//     chat_room_id: string;
//     user_id: string;
//     content: string;
//     file_type: string;
//     content_public_id: string;
//   }[];
// }

// interface AddMessageResult {
//   messageData?: MessageData;
//   messageErrors?: any;
// }

async function addSpeciality(
    resultSpecArray: any,
    resultLangArray: any,
    objects2: any
) {

    const { data, error } = await Common.createAction(
        {
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        },
        Mutations.ADD_PROFESSIONAL_BACKGROUND,
        'insert_user_professional_background'
    );

    console.log(data, 'line58');

    return { specialityData: data, specialityError: error };
}

async function addLanguages(
    resultSpecArray: any,
    resultLangArray: any,
    objects2: any
) {
    // console.log(resultLangArray,'line50');

    const { data, error } = await Common.createAction(
        {
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        },
        Mutations.ADD_PROFESSIONAL_BACKGROUND,
        'insert_users_user_languages'
    );

    console.log(data, 'line58');

    return { languageData: data, languageError: error };
}

async function addFee(
    resultSpecArray: any,
    resultLangArray: any,
    objects2: any
) {
    // console.log(resultLangArray,'line50');

    const { data, error } = await Common.createAction(
        {
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        },
        Mutations.ADD_PROFESSIONAL_BACKGROUND,
        'insert_doctor_specifications'
    );

    console.log(data, 'line58');

    return { feeData: data, feeError: error };
}

async function addUsersUserLanguage(
    newLangArray: any
) {
    const { data, error } = await Common.createAction(
        {
            newlangarray: newLangArray
        },
        Mutations.ADD_LANGUAGES,
        'insert_user_languages'
    );
    return { langData: data, langError: error };
}

async function addUsersSpeciality(
    newSpecArray: any
) {
    const { data, error } = await Common.createAction(
        {
            newspecarray: newSpecArray
        },
        Mutations.ADD_SPECIALITY,
        'insert_specialties'
    );
    return { specData: data, specError: error };
}

const AddUserProfessionalBackgroundDetails = {
    async handle(req: Request, res: Response) {
        try {
            const { objects, objects1, objects2 } =
                (req.body as AddMessageInput)?.input?.input || req?.body?.input || req?.body;


            // console.log(objects,objects1,objects2,'line145');

            // for speciality

            let newSpecArray = [];
            const filterSpecNew = objects.filter((spec: any) => spec.speciality_id === spec.speciality);
            if (filterSpecNew.length > 0) {
                newSpecArray = filterSpecNew.map((specNew: { speciality_id: any; }) => {
                    return { speciality: specNew.speciality_id };
                });
                const { specData, specError } = await addUsersSpeciality(newSpecArray)
                newSpecArray = specData.returning;
            }

            const existingSpec = objects
                .filter((spec: any) => spec.speciality_id !== spec.speciality)
                .map((spec: { user_id: any; speciality_id: any; }) => {
                    return {
                        user_id: spec.user_id,
                        speciality_id: spec.speciality_id
                    };
                });
            const resultSpecArray = [
                ...existingSpec,
                ...newSpecArray.map((spec: any) => {
                    return {
                        user_id: objects[0].user_id,
                        speciality_id: spec.id
                    };
                })
            ];


            //for language

            console.log(objects1, 'line180');

            let newLangArray = [];
            const filterLangNew = objects1.filter((lang: any) => lang.language_id === lang.language);

            console.log(filterLangNew, 'line183');

            if (filterLangNew.length > 0) {
                newLangArray = filterLangNew.map((langNew: any) => {
                    return { languages: langNew.language_id };

                });

                console.log(newLangArray, 'line189');

                const { langData, langError } = await addUsersUserLanguage(newLangArray);
                newLangArray = langData.returning;
            }
            console.log(newLangArray, 'line91');

            const existingLang = objects1
                .filter((lang: any) => lang.language_id !== lang.language)
                .map((lang: any) => {
                    return {
                        user_id: lang.user_id,
                        language_id: lang.language_id
                    };
                });
            console.log(existingLang, 'line208');


            const resultLangArray = [
                ...existingLang,
                ...newLangArray.map((lang: any) => {
                    return {
                        user_id: objects1[0].user_id,
                        language_id: lang.id
                    };
                })
            ];

            console.log(resultLangArray, 'line219');


            const { specialityData, specialityError } = await addSpeciality(resultSpecArray, resultLangArray, objects2);

            const { languageData, languageError } = await addLanguages(resultSpecArray, resultLangArray, objects2);

            const { feeData, feeError } = await addFee(resultSpecArray, resultLangArray, objects2);

            const resultData: any = {};
            resultData.spec = specialityData.returning;
            resultData.lang = languageData.returning;
            resultData.fee = feeData.returning;


            console.log(resultData);

            if (languageError || specialityError || feeError) {
                return res.status(500).json({ status: false, message: 'user professional background not added.' });
            }

            return res
                .status(200)
                .json({ status: true, message: `user professional background is added`, data: resultData });
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = AddUserProfessionalBackgroundDetails.handle;