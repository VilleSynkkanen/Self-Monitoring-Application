import * as reportService from "../../services/reportService.js";

const getMorningReports = async({response}) => {
    response.body = { message: await reportService.getMorningReports() };
};

const getEveningReports = async({response}) => {
    response.body = { message: await reportService.getEveningReports() };
};

// Gets mood for today and yesterday
const getMoodTrend = async({response}) => {
    response.body = { message: await reportService.getEveningReports() };
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

const insertEveningReport = async({request, response}) => {
    const body = request.body();
    const params = await body.value;

    const date = params.get('date');
    const sports_duration = params.get('sports_duration');
    const studying_duration = params.get('studying_duration');
    const eating_regularity = params.get('eating_regularity');
    const eating_quality = params.get('eating_quality');
    const generic_mood = params.get('generic_mood');
    await reportService.insertEveningReport(date, sports_duration, studying_duration, eating_regularity, 
        eating_quality, generic_mood, 1);
    response.status = 200;
};

   
export { getMorningReports, getEveningReports, insertMorningReport, insertEveningReport };
