/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Queries from '../../graphql/auth/queries';
import Common from '../../commons';
import { Request, Response } from 'express';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  hash_password: string;
  role_id: number;
}

async function resolvelogin(
  email: string,
  role_id: number
): Promise<{ userDetailsData: UserDetails | null; userDetailsErrors: any }> {
  console.log('line 6');
  const { data, error } = await Common.createAction(
    {
      _eq: email,
      role_id: role_id
    },
    Queries.CHECK_IF_USER_EXISTS_LOGIN,
    'users'
  );

  const user = data.length ? data[0] : null;
  return { userDetailsData: user, userDetailsErrors: error };
}

const LoginUser = {
  async handle(req: Request, res: Response) {
    try {
      const { email, role_id, password } = req.body?.input?.input || req?.body?.input || req?.body;

      const { userDetailsData, userDetailsErrors } = await resolvelogin(email, role_id);

      console.log(userDetailsData, userDetailsData?.hash_password, 'line 45');

      if (userDetailsData) {
        if (await Common.verifyPassword(userDetailsData?.hash_password, password)) {
          userDetailsData.hash_password = '';
          return res.status(200).json({
            status: true,
            message: 'User Details found',
            returning: userDetailsData
          });
        } else {
          return res.status(200).json({
            status: false,
            message: 'password mismatched'
          });
        }
      }
    } catch (e) {
      return res.status(200).json({ status: false, message: 'Something went wrong.' });
    }
  }
};

module.exports = LoginUser.handle;
