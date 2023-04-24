class Queries {
  GET_PROFILE_PICTURE_DOCTOR_PORTAL = `
    query get_profile_picture_($doctor_id: uuid!) {
        users(where: {id: {_eq: $doctor_id}}) {
          profile_picture
          profile_picture_public_id
        }
      }
      `;
  GET_PROFILE_PICTURE_MEMBER_PORTAL = `
    query get_profile_picture_($member_id: uuid!) {
        users(where: {id: {_eq: $member_id}}) {
          profile_picture
          profile_picture_public_id
        }
      }
      `;
}
export default new Queries();
