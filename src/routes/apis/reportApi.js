import * as reportService from "../../services/reportService.js";
import * as reportController from "../controllers/reportController.js";

const insertMorningReport = async(context) => {
    const body = context.request.body();
    const params = await body.value;

    const id = (await context.session.get('user')).id;
    const date = params.get('date');
    const sleep_duration = params.get('sleep_duration');
    const sleep_quality = params.get('sleep_quality');
    const generic_mood = params.get('generic_mood');
    const success = await reportService.insertMorningReport(date, sleep_duration, sleep_quality, generic_mood, id);
    if(success.passed)
    {
        context.response.redirect('/');
    }
    else
    {
        reportController.reportMorningFailed(context, success);
    }
    
};

const insertEveningReport = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const id = (await session.get('user')).id;
    const date = params.get('date');
    const sports_duration = params.get('sports_duration');
    const studying_duration = params.get('studying_duration');
    const eating_regularity = params.get('eating_regularity');
    const eating_quality = params.get('eating_quality');
    const generic_mood = params.get('generic_mood');
    await reportService.insertEveningReport(date, sports_duration, studying_duration, eating_regularity, 
        eating_quality, generic_mood, id);
    response.redirect('/');
};

   
export { insertMorningReport, insertEveningReport };
