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

interface AddMedicalSchoolRequestBody {
    input?: {
        input?: {
            user_id: string;
            medical_school_name: string;
            medical_school_url: string;
            school_public_id: string;
        };
    };
}

interface MedicalSchoolData {
    returning: {
        id: string;
        user_id: string;
        medical_school_name: string;
        medical_school_url: string;
        school_public_id: string;
        created_at: string;
        updated_at: string;
    }[];
}

interface AddMedicalSchoolResponse {
    status: boolean;
    message: string;
    data?: MedicalSchoolData['returning'][0];
}

async function addMedicalSchool(
    user_id: string,
    medical_school_name: string,
    medical_school_url: string,
    school_public_id: string
) {
    const { data, error } = await Common.createAction(
        {
            user_id: user_id,
            medical_school_name: medical_school_name,
            medical_school_url: medical_school_url,
            school_public_id: school_public_id
        },
        Mutations.ADD_MEDICAL_SCHOOL,
        'insert_medical_school'
    );

    return { medicalSchoolData: data, medicalSchoolError: error };
}

const AddMedicalSchool = {
    async handle(req: Request, res: Response) {
        try {
            const { user_id, medical_school_name, medical_school_url, school_public_id } =
                (req.body as AddMedicalSchoolRequestBody)?.input?.input || req?.body?.input || req?.body;
            console.log(user_id, medical_school_name, medical_school_url, school_public_id);

            let new_medical_school_url = '',
                new_medical_school_public_id = '';
            try {
                const addmedicalschool = await Cloudinary.cloudinaryUpload(medical_school_url);
                new_medical_school_url = addmedicalschool.eager[0].secure_url;
                new_medical_school_public_id = addmedicalschool.public_id;
            } catch (error) {
                return res.status(200).json({ status: false, message: 'file not uploaded' });
            }

            const { medicalSchoolData, medicalSchoolError } = await addMedicalSchool(
                user_id,
                medical_school_name,
                new_medical_school_url,
                new_medical_school_public_id
            );

            if (medicalSchoolError) {
                return res.status(200).json({ status: false, message: medicalSchoolError });
            }
            return res.status(200).json({
                status: true,
                message: `medical school is added`,
                data: medicalSchoolData?.returning[0]
            });
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = AddMedicalSchool.handle;