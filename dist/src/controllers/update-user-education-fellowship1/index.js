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
const mutations_1 = __importDefault(require("../../graphql/education/mutations"));
function updateUserFellowship1(fellow_ship_1_id, fellow_ship_1_url, fellow_ship_1, fellowship1_public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            fellow_ship_1_id,
            fellow_ship_1_url: fellow_ship_1_url ? fellow_ship_1_url : '',
            fellowship1_public_id: fellowship1_public_id ? fellowship1_public_id : '',
            fellow_ship_1
        }, mutations_1.default.UPDATE_USER_EDUCATION_FELLOWSHIP1, 'update_user_education');
        console.log(data, 'line 22');
        return { fellowship1Data: data, fellowship1Errors: error };
    });
}
const UpdateFellowship1 = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fellow_ship_1_id, fellow_ship_1_url, fellow_ship_1, fellow_ship_1_public_id } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                console.log('line 45');
                if (fellow_ship_1_public_id) {
                    try {
                        yield cloudinary_1.default.cloudinaryDelete(fellow_ship_1_public_id);
                    }
                    catch (error) {
                        return res.status(200).json({ status: false, message: error });
                    }
                }
                let new_fellowship1_url = '', new_fellowship1_public_id = '';
                console.log('line 57');
                if (fellow_ship_1_url) {
                    try {
                        const fellowship1_data = yield cloudinary_1.default.cloudinaryUpload(fellow_ship_1_url);
                        new_fellowship1_url = fellowship1_data.eager[0].secure_url;
                        new_fellowship1_public_id = fellowship1_data.public_id;
                    }
                    catch (error) {
                        return res.status(200).json({ status: false, message: error });
                    }
                }
                const { fellowship1Data, fellowship1Errors } = yield updateUserFellowship1(fellow_ship_1_id, new_fellowship1_url, fellow_ship_1, new_fellowship1_public_id);
                if (fellowship1Errors) {
                    return res.status(200).json({ status: false, message: 'educationErrors' });
                }
                return res.status(200).json({
                    status: true,
                    message: `Education data updated`,
                    data: fellowship1Data.returning[0]
                });
            }
            catch (e) {
                return res.status(200).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = UpdateFellowship1.handle;
//# sourceMappingURL=index.js.map