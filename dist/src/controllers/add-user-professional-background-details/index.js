"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = __importDefault(require("../../graphql/education/mutations"));
const commons_1 = __importDefault(require("../../commons"));
// interface CloudinaryUploadResponse {
//   eager: { secure_url: string }[];
//   public_id: string;
// }
// interface MessageData {
//   returning: {
//     id: string;
//     chat_room_id: string;
//     user_id: string;
//     content: string;
//     file_type: string;
//     content_public_id: string;
//   }[];
// }
// interface AddMessageResult {
//   messageData?: MessageData;
//   messageErrors?: any;
// }
function addSpeciality(resultSpecArray, resultLangArray, objects2) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        }, mutations_1.default.ADD_PROFESSIONAL_BACKGROUND, 'insert_user_professional_background');
        console.log(data, 'line58');
        return { specialityData: data, specialityError: error };
    });
}
function addLanguages(resultSpecArray, resultLangArray, objects2) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(resultLangArray,'line50');
        const { data, error } = yield commons_1.default.createAction({
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        }, mutations_1.default.ADD_PROFESSIONAL_BACKGROUND, 'insert_users_user_languages');
        console.log(data, 'line58');
        return { languageData: data, languageError: error };
    });
}
function addFee(resultSpecArray, resultLangArray, objects2) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(resultLangArray,'line50');
        const { data, error } = yield commons_1.default.createAction({
            objects: resultSpecArray,
            objects1: resultLangArray,
            objects2: objects2
        }, mutations_1.default.ADD_PROFESSIONAL_BACKGROUND, 'insert_doctor_specifications');
        console.log(data, 'line58');
        return { feeData: data, feeError: error };
    });
}
function addUsersUserLanguage(newLangArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            newlangarray: newLangArray
        }, mutations_1.default.ADD_LANGUAGES, 'insert_user_languages');
        return { langData: data, langError: error };
    });
}
function addUsersSpeciality(newSpecArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            newspecarray: newSpecArray
        }, mutations_1.default.ADD_SPECIALITY, 'insert_specialties');
        return { specData: data, specError: error };
    });
}
const AddUserProfessionalBackgroundDetails = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { objects, objects1, objects2 } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                // console.log(objects,objects1,objects2,'line145');
                // for speciality
                let newSpecArray = [];
                const filterSpecNew = objects.filter((spec) => spec.speciality_id === spec.speciality);
                if (filterSpecNew.length > 0) {
                    newSpecArray = filterSpecNew.map((specNew) => {
                        return { speciality: specNew.speciality_id };
                    });
                    const { specData, specError } = yield addUsersSpeciality(newSpecArray);
                    newSpecArray = specData.returning;
                }
                const existingSpec = objects
                    .filter((spec) => spec.speciality_id !== spec.speciality)
                    .map((spec) => {
                    return {
                        user_id: spec.user_id,
                        speciality_id: spec.speciality_id
                    };
                });
                const resultSpecArray = [
                    ...existingSpec,
                    ...newSpecArray.map((spec) => {
                        return {
                            user_id: objects[0].user_id,
                            speciality_id: spec.id
                        };
                    })
                ];
                //for language
                console.log(objects1, 'line180');
                let newLangArray = [];
                const filterLangNew = objects1.filter((lang) => lang.language_id === lang.language);
                console.log(filterLangNew, 'line183');
                if (filterLangNew.length > 0) {
                    newLangArray = filterLangNew.map((langNew) => {
                        return { languages: langNew.language_id };
                    });
                    console.log(newLangArray, 'line189');
                    const { langData, langError } = yield addUsersUserLanguage(newLangArray);
                    newLangArray = langData.returning;
                }
                console.log(newLangArray, 'line91');
                const existingLang = objects1
                    .filter((lang) => lang.language_id !== lang.language)
                    .map((lang) => {
                    return {
                        user_id: lang.user_id,
                        language_id: lang.language_id
                    };
                });
                console.log(existingLang, 'line208');
                const resultLangArray = [
                    ...existingLang,
                    ...newLangArray.map((lang) => {
                        return {
                            user_id: objects1[0].user_id,
                            language_id: lang.id
                        };
                    })
                ];
                console.log(resultLangArray, 'line219');
                const { specialityData, specialityError } = yield addSpeciality(resultSpecArray, resultLangArray, objects2);
                const { languageData, languageError } = yield addLanguages(resultSpecArray, resultLangArray, objects2);
                const { feeData, feeError } = yield addFee(resultSpecArray, resultLangArray, objects2);
                const resultData = {};
                resultData.spec = specialityData.returning;
                resultData.lang = languageData.returning;
                resultData.fee = feeData.returning;
                console.log(resultData);
                if (languageError || specialityError || feeError) {
                    return res.status(500).json({ status: false, message: 'user professional background not added.' });
                }
                return res
                    .status(200)
                    .json({ status: true, message: `user professional background is added`, data: resultData });
            }
            catch (e) {
                return res.status(500).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = AddUserProfessionalBackgroundDetails.handle;
//# sourceMappingURL=index.js.map