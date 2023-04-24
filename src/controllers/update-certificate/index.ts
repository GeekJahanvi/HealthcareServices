/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Mutations from '../../graphql/education/mutations';
import Common from '../../commons';
import { Request, Response } from 'express';
import Cloudinary from '../../../helpers/cloudinary';

interface UpdateCertificateInput {
    certificate_id: string;
    certificate_name: string;
    certificate_url?: string;
    certificate_public_id?: string;
}

async function updateCertificate({
    certificate_id,
    certificate_name,
    certificate_url,
    certificate_public_id
}: UpdateCertificateInput) {
    const { data, error } = await Common.createAction(
        {
            certificate_id,
            certificate_url,
            certificate_public_id,
            certificate_name
        },
        Mutations.UPDATE_CERTIFICATES,
        'update_certificates'
    );
    console.log(data);

    return { certificateData: data, certificateErrors: error };
}

const UpdateUserEducationCertificate = {
    async handle(req: Request, res: Response) {
        try {
            const { certificate_id, certificate_name, certificate_url, certificate_public_id } =
                req.body?.input?.input || req?.body?.input || req?.body;

            if (certificate_public_id) {
                try {
                    await Cloudinary.cloudinaryDelete(certificate_public_id);
                } catch (error) {
                    return res.status(200).json({ status: false, message: error });
                }
            }

            let new_certificate_url = '',
                new_certificate_public_id = '';

            if (certificate_url) {
                try {
                    const certificate_data = await Cloudinary.cloudinaryUpload(certificate_url);
                    new_certificate_url = certificate_data.eager[0].secure_url;
                    new_certificate_public_id = certificate_data.public_id;
                } catch (error) {
                    return res.status(200).json({ status: false, message: 'Files not uploaded' });
                }
            }
            const { certificateData, certificateErrors } = await updateCertificate({
                certificate_id,
                certificate_name,
                certificate_url: new_certificate_url,
                certificate_public_id: new_certificate_public_id
            });

            if (certificateErrors) {
                return res.status(200).json({ status: false, message: 'educationErrors' });
            }

            return res
                .status(200)
                .json({
                    status: true,
                    message: `Education data updated`,
                    data: certificateData.returning[0]
                });
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = UpdateUserEducationCertificate.handle;