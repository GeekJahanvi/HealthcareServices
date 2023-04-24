"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutations {
    constructor() {
        this.UPDATE_PROFILE_DETAILS_DOCTOR_PORTAL = `mutation update_profile_details_doctor_portal($doctor_id: uuid!, $first_name: String!, $last_name: String!, $phone: numeric!, $gender: String!, $date_of_birth: date!, $country: String!, $profile_picture: String!, $profile_picture_public_id: String!) {
        update_users(where: {id: {_eq: $doctor_id}}, _set: {first_name: $first_name, last_name: $last_name, phone: $phone, gender: $gender, date_of_birth: $date_of_birth, country: $country, profile_picture: $profile_picture, profile_picture_public_id: $profile_picture_public_id}) {
          returning {
            first_name
            last_name
            phone
            email
            gender
            date_of_birth
            country
            profile_picture
            id
            profile_picture_public_id
            
          }
        }
      }
      `;
        this.UPDATE_PROFILE_DETAILS_MEMBER_PORTAL = `mutation update_profile_details_member_portal($member_id: uuid!, $first_name: String!, $last_name: String!, $email: String!, $phone: numeric!, $gender: String!, $date_of_birth: date!, $country: String!, $profile_picture: String , $data_filled: Boolean = true, $profile_picture_public_id: String) {
        update_users(where: {id: {_eq: $member_id}}, _set: {first_name: $first_name, last_name: $last_name, email: $email, phone: $phone, gender: $gender, date_of_birth: $date_of_birth, country: $country, profile_picture: $profile_picture , data_filled: $data_filled, profile_picture_public_id: $profile_picture_public_id}) {
          returning {
            first_name
            last_name
            email
            phone
            gender
            date_of_birth
            country
            profile_picture
            id
            data_filled
            profile_picture_public_id
          }
        }
      }`;
    }
}
exports.default = new Mutations();
//# sourceMappingURL=mutations.js.map