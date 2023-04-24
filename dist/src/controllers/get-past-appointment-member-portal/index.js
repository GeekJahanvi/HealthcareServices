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
const queries_1 = __importDefault(require("../../graphql/appointments/queries"));
const commons_1 = __importDefault(require("../../commons"));
function getPastAppointment({ member_id, start_time, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            member_id: member_id,
            start_time: start_time,
            date: date
        }, queries_1.default.GET_PAST_APPOINTMENTS_MEMBER_PORTAL, 'appointments');
        console.log(data, "line46");
        return { appointmentTodayData: data, appointmentTodayErrors: error };
    });
}
function getPastAppointmentYesterday({ member_id, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield commons_1.default.createAction({
            member_id: member_id,
            date: date
        }, queries_1.default.GET_PAST_APPOINTMENTS_MEMBER_PORTAL_YESTERDAY, 'appointments');
        console.log(data, "line61");
        return { appointmentYesterdayData: data, appointmentYesterdayErrors: error };
    });
}
const GetPastAppointmentMemberPortal = {
    handle(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello");
                const { member_id } = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.input) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.input) || (req === null || req === void 0 ? void 0 : req.body);
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 30);
                const updatedTimeString = currentTime.toTimeString();
                const start_time = updatedTimeString.split(' ')[0];
                const getCurrentDate = () => new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
                const date = getCurrentDate();
                console.log(start_time, date);
                const { appointmentTodayData, appointmentTodayErrors } = yield getPastAppointment({ member_id, start_time, date });
                console.log(appointmentTodayData);
                const { appointmentYesterdayData, appointmentYesterdayErrors } = yield getPastAppointmentYesterday({ member_id, date });
                console.log(appointmentYesterdayData);
                const AllPastAppointment = [
                    ...appointmentTodayData,
                    ...appointmentYesterdayData
                ];
                console.log(AllPastAppointment[0], "line100");
                if (appointmentTodayErrors || appointmentYesterdayErrors) {
                    return res.status(200).json({ status: false, message: "no appointments" });
                }
                return res.status(200).json({
                    status: true,
                    message: `All past Appointment generated`,
                    data: AllPastAppointment,
                });
            }
            catch (e) {
                return res.status(200).json({ status: false, message: 'Something went wrong.' });
            }
        });
    }
};
module.exports = GetPastAppointmentMemberPortal.handle;
//# sourceMappingURL=index.js.map