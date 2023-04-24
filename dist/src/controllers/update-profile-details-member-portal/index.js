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
const cloudinary_1 = __importDefault(require("../../../helpers/cloudinary"));
const commons_1 = __importDefault(require("../../commons"));
const mutations_1 = __importDefault(require("../../graphql/profile/mutations"));
const queries_1 = __importDefault(require("../../graphql/profile/queries"));
function resolveProfileDetails(member_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('line 7');
        const { data, error } = yield commons_1.default.createAction({
            member_id: member_id
        }, queries_1.default.GET_PROFILE_PICTURE_MEMBER_PORTAL, 'users');
        console.log(data, 'line 14');
        const Details = data.length ? data[0] : null;
        return { profileDetailsData: Details, profileDetailsErrors: error };
    });
}
function ProfileDetails(member_id, first_name, last_name, email, phone, gender, date_of_birth, country, profile_picture, profile_picture_public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
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
        }, mutations_1.default.UPDATE_PROFILE_DETAILS_MEMBER_PORTAL, 'update_users');
        console.log(data, 'line45');
        return { Details: data, errors: error };
    });
}
const UpdateProfileDetailsMemberPortal = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('line 51');
            try {
                const { member_id, first_name, last_name, email, phone, gender, date_of_birth, country, profile_picture } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                console.log(member_id, first_name, last_name, email, phone, gender, date_of_birth, country, profile_picture);
                let new_profile_picture = '', new_profile_picture_public_id = '';
                const { profileDetailsData, profileDetailsErrors } = yield resolveProfileDetails(member_id);
                console.log(profileDetailsData, 'LINE 43');
                console.log('line 68');
                if (profile_picture) {
                    console.log(profile_picture, 'line 72');
                    console.log(profileDetailsData.profile_picture_public_id);
                    if (profileDetailsData.profile_picture_public_id)
                        yield cloudinary_1.default.cloudinaryDelete(profileDetailsData.profile_picture_public_id);
                    const profileData = yield cloudinary_1.default.cloudinaryUpload(profile_picture);
                    new_profile_picture = profileData.eager[0].secure_url;
                    new_profile_picture_public_id = profileData.public_id;
                    console.log(profileData, 'line 89');
                }
                else {
                    new_profile_picture = profileDetailsData.profile_picture;
                    new_profile_picture_public_id = profileDetailsData.profile_picture_public_id;
                }
                if (profileDetailsErrors) {
                    return res.status(200).json({ status: false, message: profileDetailsErrors });
                }
                const { Details, errors } = yield ProfileDetails(member_id, first_name, last_name, email, phone, gender, date_of_birth, country, new_profile_picture, new_profile_picture_public_id);
                if (errors) {
                    return res.status(200).json({ status: false, message: errors });
                }
                return res.status(200).json({
                    status: true,
                    message: `profile details updated`,
                    data: Details.returning[0]
                });
            }
            catch (e) {
                return res.status(200).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = UpdateProfileDetailsMemberPortal.handle;
//# sourceMappingURL=index.js.map