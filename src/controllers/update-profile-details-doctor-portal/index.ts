/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Queries from '../../graphql/profile/queries';
import Mutations from '../../graphql/profile/mutations';
import Common from '../../commons';
import Cloudinary from '../../../helpers/cloudinary';
import { Request, Response } from 'express';

async function resolveProfileDetails(
  doctor_id: string
): Promise<{ profileDetailsData: any; profileDetailsErrors: any }> {
  console.log('line 7');
  const { data, error } = await Common.createAction(
    {
      doctor_id: doctor_id
    },
    Queries.GET_PROFILE_PICTURE_DOCTOR_PORTAL,
    'users'
  );
  console.log(data, 'line 14');
  const Details = data.length ? data[0] : null;
  return { profileDetailsData: Details, profileDetailsErrors: error };
}

async function ProfileDetails(
  doctor_id: string,
  first_name: string,
  last_name: string,
  phone: string,
  gender: string,
  date_of_birth: string,
  country: string,
  profile_picture: string,
  profile_picture_public_id: string
): Promise<{ Details: any; errors: any }> {
  const { data, error } = await Common.createAction(
    {
      doctor_id: doctor_id,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      gender: gender,
      date_of_birth: date_of_birth,
      country: country,
      profile_picture: profile_picture,
      profile_picture_public_id: profile_picture_public_id
    },
    Mutations.UPDATE_PROFILE_DETAILS_DOCTOR_PORTAL,
    'update_users'
  );
  console.log(data, 'line45');
  return { Details: data, errors: error };
}

const UpdateProfileDetails = {
  async handle(req: Request, res: Response): Promise<Response> {
    console.log('line 51');
    try {
      const {
        doctor_id,
        first_name,
        last_name,
        phone,
        gender,
        date_of_birth,
        country,
        profile_picture
      } = req.body?.input?.input || req?.body?.input || req?.body;
      console.log(
        doctor_id,
        first_name,
        last_name,
        phone,
        gender,
        date_of_birth,
        country,
        profile_picture
      );

      let new_profile_picture = '',
        new_profile_picture_public_id = '';

      const { profileDetailsData, profileDetailsErrors } = await resolveProfileDetails(doctor_id);
      console.log(profileDetailsData, 'LINE 43');

      console.log('line 68');

      if (profile_picture) {
        console.log(profile_picture, 'line 72');
        console.log(profileDetailsData.profile_picture_public_id);
        if (profileDetailsData.profile_picture_public_id)
          await Cloudinary.cloudinaryDelete(profileDetailsData.profile_picture_public_id);
        const profileData = await Cloudinary.cloudinaryUpload(profile_picture);
        new_profile_picture = profileData.eager[0].secure_url;
        new_profile_picture_public_id = profileData.public_id;
        console.log(profileData, 'line 89');
      } else {
        new_profile_picture = profileDetailsData.profile_picture;
        new_profile_picture_public_id = profileDetailsData.profile_picture_public_id;
      }

      if (profileDetailsErrors) {
        return res.status(200).json({ status: false, message: profileDetailsErrors });
      }

      const { Details, errors } = await ProfileDetails(
        doctor_id,
        first_name,
        last_name,
        phone,
        gender,
        date_of_birth,
        country,
        new_profile_picture,
        new_profile_picture_public_id
      );

      if (errors) {
        return res.status(200).json({ status: false, message: errors });
      }

      return res.status(200).json({
        status: true,
        message: `profile details updated`,
        data: Details.returning[0]
      });
    } catch (e) {
      return res.status(200).json({ status: false, message: 'Something went wrong.' });
    }
  }
};

module.exports = UpdateProfileDetails.handle;
