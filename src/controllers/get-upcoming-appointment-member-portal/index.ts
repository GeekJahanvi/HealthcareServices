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


interface GetUpcomingAppointmentInput {
    member_id: string;
    start_time: string;
    date: string
}

interface GetUpcomingAppointmentTomorrowInput {
    member_id: string;
    date: string
}

interface GetUpcomingAppointmentOutput {
    appointmentTodayData: any;
    appointmentTodayErrors: any;
}

interface GetUpcomingAppointmentTomorrowOutput {
    appointmentTomorrowData: any;
    appointmentTomorrowErrors: any;
}

async function getUpcomingAppointment({ member_id, start_time, date }: GetUpcomingAppointmentInput): Promise<GetUpcomingAppointmentOutput> {

    const { data, error } = await Common.createAction(
        {
            member_id: member_id,
            start_time: start_time,
            date: date
        },
        Queries.GET_UPCOMING_APPOINTMENTS_MEMBER_PORTAL,
        'appointments',
    );

    console.log(data, "line46");

    return { appointmentTodayData: data, appointmentTodayErrors: error };
}

async function getUpcomingAppointmentTomorrow({ member_id, date }: GetUpcomingAppointmentTomorrowInput): Promise<GetUpcomingAppointmentTomorrowOutput> {

    const { data, error } = await Common.createAction(
        {
            member_id: member_id,
            date: date
        },
        Queries.GET_UPCOMING_APPOINTMENTS_MEMBER_PORTAL_TOMORROW,
        'appointments',
    );
    console.log(data, "line61");
    return { appointmentTomorrowData: data, appointmentTomorrowErrors: error };
}

const GetUpcomingAppointmentMemberPortal = {
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

            const { appointmentTodayData, appointmentTodayErrors } = await getUpcomingAppointment({ member_id, start_time, date });

            console.log(appointmentTodayData);


            const { appointmentTomorrowData, appointmentTomorrowErrors } = await getUpcomingAppointmentTomorrow({ member_id, date });

            console.log(appointmentTomorrowData);

            const AllUpcomingAppointment = [
                ...appointmentTodayData,
                ...appointmentTomorrowData
            ];


            console.log(AllUpcomingAppointment, "line100");

            if (appointmentTodayErrors || appointmentTomorrowErrors) {
                return res.status(200).json({ status: false, message: "no appointments" });
            }


            return res.status(200).json({
                status: true,
                message: `All Upcoming Appointment generated`,
                data: AllUpcomingAppointment,
            });
        } catch (e) {
            return res.status(200).json({ status: false, message: 'Something went wrong.' });
        }
    }
};

module.exports = GetUpcomingAppointmentMemberPortal.handle;