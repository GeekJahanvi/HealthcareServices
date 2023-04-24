/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Queries from '../../graphql/appointments/queries';
import Common from '../../commons';
import { Request, Response } from 'express';
import Mutations from '../../graphql/appointments/mutations';

interface GetPastAppointmentInput {
    member_id: string;
    start_time: string;
    date: string
}

interface GetPastAppointmentYesterdayInput {
    member_id: string;
    date: string
}

interface GetPastAppointmentOutput {
    appointmentTodayData: any;
    appointmentTodayErrors: any;
}

interface GetPastAppointmentYesterdayOutput {
    appointmentYesterdayData: any;
    appointmentYesterdayErrors: any;
}

async function getPastAppointment({ member_id, start_time, date }: GetPastAppointmentInput): Promise<GetPastAppointmentOutput> {

    const { data, error } = await Common.createAction(
        {
            member_id: member_id,
            start_time: start_time,
            date: date
        },
        Queries.GET_PAST_APPOINTMENTS_MEMBER_PORTAL,
        'appointments',
    );

    console.log(data, "line46");

    return { appointmentTodayData: data, appointmentTodayErrors: error };
}

async function getPastAppointmentYesterday({ member_id, date }: GetPastAppointmentYesterdayInput): Promise<GetPastAppointmentYesterdayOutput> {

    const { data, error } = await Common.createAction(
        {
            member_id: member_id,
            date: date
        },
        Queries.GET_PAST_APPOINTMENTS_MEMBER_PORTAL_YESTERDAY,
        'appointments',
    );
    console.log(data, "line61");
    return { appointmentYesterdayData: data, appointmentYesterdayErrors: error };
}

const GetPastAppointmentMemberPortal = {
    async handle(req: Request, res: Response) {


        try {
            console.log("hello");
            const { member_id } = req.body?.input?.input || req?.body?.input || req?.body;

            const currentTime = new Date();
            currentTime.setMinutes(currentTime.getMinutes() - 30);
            const updatedTimeString = currentTime.toTimeString();
            const start_time = updatedTimeString.split(' ')[0];

            const getCurrentDate = () =>
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

            const date = getCurrentDate();

            console.log(start_time, date);

            const { appointmentTodayData, appointmentTodayErrors } = await getPastAppointment({ member_id, start_time, date });

            console.log(appointmentTodayData);


            const { appointmentYesterdayData, appointmentYesterdayErrors } = await getPastAppointmentYesterday({ member_id, date });

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
        } catch (e) {
            return res.status(200).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = GetPastAppointmentMemberPortal.handle;