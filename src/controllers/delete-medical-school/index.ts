/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import Mutations from '../../graphql/medical_history/mutations';
import Common from '../../commons';
import Cloudinary from '../../../helpers/cloudinary';

async function deleteMedicalSchool(medical_school_id: string) {
    const { data, error } = await Common.createAction(
        { medical_school_id },
        Mutations.DELETE_MEDICAL_SCHOOL,
        'delete_medical_school'
    );

    return { deletedData: data, deletedError: error };
}

const DeleteMedicalSchool = {
    async handle(req: Request, res: Response) {
        try {
            const { medical_school_id } = req.body?.input?.input || req?.body?.input || req?.body;

            const { deletedData, deletedError } = await deleteMedicalSchool(medical_school_id);

            if (deletedError) {
                return res.status(200).json({ status: false, message: deletedError });
            }
            if (deletedData.returning[0].school_public_id) {
                await Cloudinary.cloudinaryDelete(deletedData.returning[0].school_public_id);
            }
            return res.status(200).json({ status: true, message: 'medical school deleted', data: deletedData.returning[0] });
        }
        catch (e) {
            return res.status(500).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = DeleteMedicalSchool.handle;
