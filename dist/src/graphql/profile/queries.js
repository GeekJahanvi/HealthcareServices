"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.GET_PROFILE_PICTURE_DOCTOR_PORTAL = `
    query get_profile_picture_($doctor_id: uuid!) {
        users(where: {id: {_eq: $doctor_id}}) {
          profile_picture
          profile_picture_public_id
        }
      }
      `;
        this.GET_PROFILE_PICTURE_MEMBER_PORTAL = `
    query get_profile_picture_($member_id: uuid!) {
        users(where: {id: {_eq: $member_id}}) {
          profile_picture
          profile_picture_public_id
        }
      }
      `;
    }
}
exports.default = new Queries();
//# sourceMappingURL=queries.js.map