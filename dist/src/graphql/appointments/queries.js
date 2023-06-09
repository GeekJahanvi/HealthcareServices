"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.CHECK_TIMESLOT = `query check_timeslot($timeslot_id: uuid!) {
        timeslots(where: {id: {_eq: $timeslot_id}}) {
          booked
        }
      }`;
        this.GET_UPCOMING_APPOINTMENTS_MEMBER_PORTAL_TOMORROW = `query get_upcoming_appointments_member_portal_tomorrow($member_id: uuid!, $date: date!){
        appointments(where: {member_id: {_eq: $member_id}, _and: {appointment_date: {_gt: $date}, _and: {cancel: {_eq: false}}}}) {
          id
          time
          appointment_date
          doctor_id
          relatives_full_name
          relationship
          timeslot_id
          user {
            first_name
            last_name
          }
          userByPhysicianId {
            first_name
            last_name
            profile_picture
            user_professional_backgrounds {
              specialty {
                speciality
                id
              }
            }
          }
        }
      }`;
        this.GET_UPCOMING_APPOINTMENTS_MEMBER_PORTAL = `query get_upcoming_appointments_member_portal($member_id: uuid="", $date: date!, $start_time: time) {
        appointments(where: {member_id: {_eq: $member_id}, _and: {appointment_date: {_eq: $date}, _and: {cancel: {_eq: false}, _and: {time: {_gte: $start_time}}}}}) {
          id
          time
          appointment_date
          doctor_id
          relatives_full_name
          relationship
          timeslot_id
          accepted
          user {
            first_name
            last_name
          }
          userByPhysicianId {
            first_name
            last_name
            profile_picture
            user_professional_backgrounds {
              specialty {
                speciality
                id
              }
            }
          }
        }
      }`;
        this.GET_PAST_APPOINTMENTS_MEMBER_PORTAL = `query get_past_appointments_member_portal($member_id: uuid!, $date: date!, $start_time: time!) {
        appointments(where: {member_id: {_eq: $member_id}, _and: {appointment_date: {_eq: $date}, time: {_lt: $start_time}}}) {
          id
          time
          appointment_date
          doctor_id
          relatives_full_name
          relationship
          timeslot_id
          cancel
          user {
            first_name
            last_name
          }
          userByPhysicianId {
            first_name
            last_name
            profile_picture
            user_professional_backgrounds {
              specialty {
                speciality
                id
              }
            }
          }
        }
      }`;
        this.GET_PAST_APPOINTMENTS_MEMBER_PORTAL_YESTERDAY = `query get_past_appointments_member_portal_yesterday($member_id: uuid!, $date: date!) {
        appointments(where: {member_id: {_eq: $member_id}, _and: {appointment_date: {_lt: $date}}}) {
          id
          time
          appointment_date
          doctor_id
          relatives_full_name
          relationship
          timeslot_id
          cancel
          user {
            first_name
            last_name
          }
          userByPhysicianId {
            first_name
            last_name
            profile_picture
            user_professional_backgrounds {
              specialty {
                speciality
                id
              }
            }
          }
        }
      }`;
    }
}
exports.default = new Queries();
//# sourceMappingURL=queries.js.map