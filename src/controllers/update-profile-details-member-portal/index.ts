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
import Mutations from '../../graphql/profile/mutations';
import Queries from '../../graphql/profile/queries';

async function resolveProfileDetails(member_id: string) {
  console.log('line 7');
  const { data, error } = await Common.createAction(
    {
      member_id: member_id
    },
    Queries.GET_PROFILE_PICTURE_MEMBER_PORTAL,
    'users'
  );
  console.log(data, 'line 14');
  const Details = data.length ? data[0] : null;
  return { profileDetailsData: Details, profileDetailsErrors: error };
}

async function ProfileDetails(
  member_id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  gender: string,
  date_of_birth: string,
  country: string,
  profile_picture: string,
  profile_picture_public_id: string
) {
  const { data, error } = await Common.createAction(
    {
      member_id: member_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      gender: gender,
      date_of_birth: date_of_birth,
      country: country,
      profile_picture: profile_picture,
      profile_picture_public_id: profile_picture_public_id
    },
    Mutations.UPDATE_PROFILE_DETAILS_MEMBER_PORTAL,
    'update_users'
  );
  console.log(data, 'line45');
  return { Details: data, errors: error };
}

const UpdateProfileDetailsMemberPortal = {
  async handle(req: Request, res: Response) {
    console.log('line 51');
    try {
      const {
        member_id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        date_of_birth,
        country,
        profile_picture
      } = req.body?.input?.input || req?.body?.input || req?.body;
      console.log(
        member_id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        date_of_birth,
        country,
        profile_picture
      );

      let new_profile_picture = '',
        new_profile_picture_public_id = '';

      const { profileDetailsData, profileDetailsErrors } = await resolveProfileDetails(member_id);
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
        member_id,
        first_name,
        last_name,
        email,
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

module.exports = UpdateProfileDetailsMemberPortal.handle;
