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
import Mutations from '../../graphql/education/mutations';

async function updateUserFellowship1(
  fellow_ship_1_id: any,
  fellow_ship_1_url: any,
  fellow_ship_1: any,
  fellowship1_public_id: string
) {
  const { data, error } = await Common.createAction(
    {
      fellow_ship_1_id,
      fellow_ship_1_url: fellow_ship_1_url ? fellow_ship_1_url : '',
      fellowship1_public_id: fellowship1_public_id ? fellowship1_public_id : '',
      fellow_ship_1
    },

    Mutations.UPDATE_USER_EDUCATION_FELLOWSHIP1,
    'update_user_education'
  );

  console.log(data, 'line 22');
  return { fellowship1Data: data, fellowship1Errors: error };
}

const UpdateFellowship1 = {
  async handle(req: Request, res: Response) {
    try {
      const { fellow_ship_1_id, fellow_ship_1_url, fellow_ship_1, fellow_ship_1_public_id } =
        req.body?.input?.input || req?.body?.input || req?.body;

    
      console.log('line 45');
      if (fellow_ship_1_public_id) {
        try {
          await Cloudinary.cloudinaryDelete(fellow_ship_1_public_id);
        } catch (error) {
          return res.status(200).json({ status: false, message: error });
        }
      }

      let new_fellowship1_url = '',
        new_fellowship1_public_id = '';
      console.log('line 57');
      if (fellow_ship_1_url) {
        try {
          const fellowship1_data = await Cloudinary.cloudinaryUpload(fellow_ship_1_url);
          new_fellowship1_url = fellowship1_data.eager[0].secure_url;
          new_fellowship1_public_id = fellowship1_data.public_id;
        } catch (error) {
          return res.status(200).json({ status: false, message: error });
        }
      }
      const { fellowship1Data, fellowship1Errors } = await updateUserFellowship1(
        fellow_ship_1_id,
        new_fellowship1_url,
        fellow_ship_1,
        new_fellowship1_public_id
      );

      if (fellowship1Errors) {
        return res.status(200).json({ status: false, message: 'educationErrors' });
      }

      return res.status(200).json({
        status: true,
        message: `Education data updated`,
        data: fellowship1Data.returning[0]
      });
    } catch (e) {
      return res.status(200).json({ status: false, message: 'Something went wrong.' });
    }
  }
};
module.exports = UpdateFellowship1.handle;
