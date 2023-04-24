/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import Cloudinary from '../../../helpers/cloudinary';
import Common from '../../commons';
import Mutations from '../../graphql/medical_history/mutations';

async function updateLabReport(
  lab_id: string,
  filename: string,
  new_lab_url: string,
  new_lab_public_id: string
) {
  const { data, error } = await Common.createAction(
    {
      lab_id,
      filename,
      lab_url: new_lab_url,
      lab_public_id: new_lab_public_id,
    },
    Mutations.UPDATE_LAB_REPORT,
    'update_lab_reports'
  );

  return { updateLabData: data, updateLabError: error };
}

export const UpdateLabReport = {
  async handle(req: Request, res: Response) {
    try {
      const { lab_id, filename, lab_url, lab_public_id } =
        req.body?.input?.input || req?.body?.input || req?.body;

      if (lab_public_id) {
        await Cloudinary.cloudinaryDelete(lab_public_id);
      }

      let new_lab_url = '',
        new_lab_public_id = '';

      if (lab_url) {
        const imageData = await Cloudinary.cloudinaryUpload(lab_url);
        new_lab_url = imageData.eager[0].secure_url;
        new_lab_public_id = imageData.public_id;
      } else {
        new_lab_url = '';
        new_lab_public_id = '';
      }

      const { updateLabData, updateLabError } = await updateLabReport(
        lab_id,
        filename,
        new_lab_url,
        new_lab_public_id
      );

      if (updateLabError) {
        return res.status(200).json({ status: false, message: updateLabError });
      }

      return res.status(200).json({
        status: true,
        message: `lab report is updated`,
        data: updateLabData.returning[0],
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: 'Something went wrong.' });
    }
  },
};

module.exports = UpdateLabReport.handle;
