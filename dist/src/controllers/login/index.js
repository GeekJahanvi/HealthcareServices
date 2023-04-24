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
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const queries_1 = __importDefault(require("../../graphql/auth/queries"));
const commons_1 = __importDefault(require("../../commons"));
function resolvelogin(email, role_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('line 6');
        const { data, error } = yield commons_1.default.createAction({
            _eq: email,
            role_id: role_id
        }, queries_1.default.CHECK_IF_USER_EXISTS_LOGIN, 'users');
        const user = data.length ? data[0] : null;
        return { userDetailsData: user, userDetailsErrors: error };
    });
}
const LoginUser = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, role_id, password } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                const { userDetailsData, userDetailsErrors } = yield resolvelogin(email, role_id);
                console.log(userDetailsData, userDetailsData === null || userDetailsData === void 0 ? void 0 : userDetailsData.hash_password, 'line 45');
                if (userDetailsData) {
                    if (yield commons_1.default.verifyPassword(userDetailsData === null || userDetailsData === void 0 ? void 0 : userDetailsData.hash_password, password)) {
                        userDetailsData.hash_password = '';
                        return res.status(200).json({
                            status: true,
                            message: 'User Details found',
                            returning: userDetailsData
                        });
                    }
                    else {
                        return res.status(200).json({
                            status: false,
                            message: 'password mismatched'
                        });
                    }
                }
            }
            catch (e) {
                return res.status(200).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = LoginUser.handle;
//# sourceMappingURL=index.js.map