/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import Common from '../../commons';
import Cloudinary from '../../../helpers/cloudinary';
import Queries from "../../graphql/delete_user/queries";
import Mutations from "../../graphql/delete_user/mutations";

async function getPublicId(member_id: string) {
  const { data, error } = await Common.createAction(
    {
      member_id: member_id,
    },
    Queries.GET_MEMBER_PUBLIC_ID,
    "users"
  );

  return { idData: data, idError: error };
}

async function deleteMember(member_id: string) {
  const { data, error } = await Common.createAction(
    {
      member_id: member_id,
    },
    Mutations.DELETE_MEMBER,
    "delete_users"
  );

  return { deletedData: data, deletedError: error };
}

const DeleteMember = {
  async handle(req: Request, res: Response) {
    try {

      const { member_id } =
        req.body?.input?.input || req?.body?.input || req?.body;

      const { idData, idError } = await getPublicId(member_id);
      if (idError) {
        return res.status(200).json({ status: false, message: idError });
      }
      const array1: string[] = [];
      if (idData.length != 0) {
        if (idData[0].profile_picture_public_id != null) {
          array1.push(idData.profile_picture_public_id);
        }
      }

      if (idData.length) {
        for (let i = 0; i < idData[0].images.length; i++) {
          array1[array1.length + i] = idData[0].images[i].image_public_id;
        }
        for (let i = 0; i < idData[0].labs.length; i++) {
          array1[array1.length + i] = idData[0].labs[i].lab_public_id;
        }
        for (let i = 0; i < idData[0].medical_documents.length; i++) {
          array1[array1.length + i] =
            idData[0].medical_documents[i].document_public_id;
        }
      }

      if (array1.length !== 0) {
        await Cloudinary.cloudinaryDeleteAll(array1);
      }

      const { deletedData, deletedError } = await deleteMember(member_id);

      if (deletedError) {
        return res.status(200).json({ status: false, message: deletedError });
      }
      return res
        .status(200)
        .json({ status: true, message: `member is deleted`, data: deletedData.returning[0] });
    } catch (e) {
      return res.status(500).json({ status: false, message: "Something went wronggg." });
    }
  },
};

module.exports = DeleteMember.handle;
