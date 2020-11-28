import * as reportService from "../../services/reportService.js";

const getMorningReports = async({response}) => {
    response.body = { message: await reportService.getMorningReports() };
};

const insertMorningReport = async({request, response}) => {
    const body = request.body();
    const params = await body.value;

    const date = params.get('date');
    const sleep_duration = params.get('sleep_duration');
    const sleep_quality = params.get('sleep_quality');
    const generic_mood = params.get('generic_mood');
    await reportService.insertMorningReport(date, sleep_duration, sleep_quality, generic_mood, 1);
    response.status = 200;
};
   
export { getMorningReports, insertMorningReport };