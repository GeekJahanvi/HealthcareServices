class Mutations {
  UPDATE_USER_EDUCATION_FELLOWSHIP1 = `mutation update_user_education_fellowship1($fellow_ship_1_id: uuid!, $fellow_ship_1: String!, $fellow_ship_1_url: String!, $fellowship1_public_id: String!) {
    update_user_education(where: {id: {_eq: $fellow_ship_1_id}}, _set: {fellow_ship_1: $fellow_ship_1, fellow_ship_1_url: $fellow_ship_1_url, fellowship1_public_id: $fellowship1_public_id}) {
      returning {
        fellow_ship_1
        fellow_ship_1_url
        id
        fellowship1_public_id
      }
    }
  }`;

  ADD_USER_EDUCATION = `mutation add_user_education($user_id: uuid!, $fellow_ship_1: String!, $fellow_ship_1_url: String!, $fellow_ship_2: String!, $fellow_ship_2_url: String!, $state_medical_license: String!, $state_medical_license_url: String!, $fellowship1_public_id: String!, $fellowship2_public_id: String! ,  $state_public_id:String!) {
        insert_user_education(objects: {user_id: $user_id, fellow_ship_1: $fellow_ship_1, fellow_ship_1_url: $fellow_ship_1_url, fellow_ship_2: $fellow_ship_2, fellow_ship_2_url: $fellow_ship_2_url, state_medical_license: $state_medical_license, state_medical_license_url: $state_medical_license_url , fellowship1_public_id: $fellowship1_public_id , fellowship2_public_id: $fellowship2_public_id , state_public_id: $state_public_id}) {
          returning {
            id
            fellow_ship_1
            fellow_ship_1_url
            fellow_ship_2
            fellow_ship_2_url
            user_id
            state_medical_license
            state_medical_license_url
            fellowship1_public_id
            fellowship2_public_id
            state_public_id
          }
        }
    }`;

  UPDATE_USER_EDUCATION = `mutation update_user_education($doctor_id: uuid!, $fellow_ship_1: String!, $fellow_ship_1_url: String!, $fellow_ship_2: String!, $fellow_ship_2_url: String!, $state_medical_license: String!, $state_medical_license_url: String! , $fellowship1_public_id: String!, $fellowship2_public_id: String!, $state_public_id: String!) {
      update_user_education(where: {user_id: {_eq: $doctor_id}}, _set: {fellow_ship_1: $fellow_ship_1, fellow_ship_1_url: $fellow_ship_1_url, fellow_ship_2: $fellow_ship_2, fellow_ship_2_url: $fellow_ship_2_url, state_medical_license: $state_medical_license, state_medical_license_url: $state_medical_license_url, fellowship1_public_id: $fellowship1_public_id, fellowship2_public_id: $fellowship2_public_id, state_public_id: $state_public_id}) {
        returning {
          id
          fellow_ship_1
          fellow_ship_1_url
          fellow_ship_2
          fellow_ship_2_url
          user_id
          state_medical_license
          state_medical_license_url
          fellowship1_public_id,
          fellowship2_public_id,
          state_public_id
        }
      }
    }
    `;

  UPDATE_USER_EDUCATION_STATE_MEDICAL_LICENSE = `mutation update_user_education_state_license($state_medical_license_id: uuid!, $state_medical_license: String!, $state_medical_license_url: String!, $state_public_id: String!) {
      update_user_education(where: {id: {_eq: $state_medical_license_id}}, _set: {state_medical_license: $state_medical_license, state_medical_license_url: $state_medical_license_url, state_public_id: $state_public_id}) {
        returning {
          state_medical_license
          state_medical_license_url
          id
          state_public_id
        }
      }
    }
      `;

  UPDATE_USER_EDUCATION_FELLOWSHIP2 = `mutation update_user_education_fellowship2($fellow_ship_2_id: uuid!, $fellow_ship_2: String!, $fellow_ship_2_url: String!, $fellowship2_public_id: String!) {
      update_user_education(where: {id: {_eq: $fellow_ship_2_id}}, _set: {fellow_ship_2: $fellow_ship_2, fellow_ship_2_url: $fellow_ship_2_url, fellowship2_public_id: $fellowship2_public_id}) {
        returning {
          fellow_ship_2
          fellow_ship_2_url
          id
          fellowship2_public_id
        }
      }
    }`;

  UPDATE_MEDICAL_SCHOOL = `mutation update_medical_school($medical_school_id: uuid!, $medical_school_name: String!, $medical_school_url: String!, $school_public_id: String!) {
      update_medical_school(where: {id: {_eq: $medical_school_id}}, _set: {medical_school_name: $medical_school_name, medical_school_url: $medical_school_url, school_public_id: $school_public_id}) {
        returning {
          id
          medical_school_name
          medical_school_url
          school_public_id
        }
      }
    }`;

  ADD_PROFESSIONAL_BACKGROUND = `mutation upsert_background_details($objects: [user_professional_background_insert_input!]!, $objects1: [users_user_languages_insert_input!]!, $objects2: [doctor_specifications_insert_input!]!) {
      insert_user_professional_background(objects: $objects, on_conflict: {constraint: user_professional_background_user_id_speciality_id_key, update_columns: [user_id, speciality_id]}) {
        returning {
          id
          speciality_id
          specialty {
            speciality
          }
        }
      }
      insert_users_user_languages(objects: $objects1, on_conflict: {constraint: users_user_languages_user_id_language_id_key, update_columns: [user_id, language_id]}) {
        returning {
          id
          language_id
          user_language {
            languages
          }
        }
      }
      insert_doctor_specifications(objects: $objects2, on_conflict: {constraint: doctor_specifications_doctor_id_key, update_columns: [fee]}) {
        returning {
          fee
          doctor_id
        }
      }
    }`;

  ADD_LANGUAGES = `mutation insert_multiple_user_languages($newlangarray:[user_languages_insert_input!]!) {
      insert_user_languages(objects: $newlangarray){
        returning{
          id
          languages
        }
      }
    }`;

  ADD_SPECIALITY = `mutation insert_multiple_specialties($newspecarray:[specialties_insert_input!]!) {
      insert_specialties(objects: $newspecarray){
        returning{
          id
          speciality
        }
      }
    }`;

  UPDATE_MEDICAL_DOCUMENTS = `mutation update_medical_documents($medical_document_id: uuid! , $document_name: String! , $document_url: String!, $document_public_id: String!) {
      update_medical_documents(where: {id: {_eq: $medical_document_id}}, _set: {document_name: $document_name, document_url: $document_url, document_public_id: $document_public_id}) {
        returning {
          id
          document_name
          document_url
          document_public_id
        }
      }
    }`;

  UPDATE_CERTIFICATES = `mutation update_certificates($certificate_id: uuid!, $certificate_name: String!, $certificate_url: String! , $certificate_public_id: String!) {
      update_certificates(where: {id: {_eq: $certificate_id}}, _set: {certificate_name: $certificate_name, certificate_url: $certificate_url, certificate_public_id: $certificate_public_id}) {
        returning {
          id
          certificate_name
          certificate_url
          certificate_public_id
        }
      }
    }`;
}
export default new Mutations();
