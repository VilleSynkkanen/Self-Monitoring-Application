import * as summaryService from "../../services/summaryService.js";

const getLastWeekReports = async(context) => {
    const result = await summaryService.getGeneralSummary();
    context.response.body = JSON.stringify(result);
    context.response.headers = new Headers({"Content-Type": "application/json"})
};

const getDayReports = async(context) => {
    const result = await summaryService.getGeneralSummaryDay(context);
    context.response.body = JSON.stringify(result);
    context.response.headers = new Headers({"Content-Type": "application/json"})
};

export { getDayReports, getLastWeekReports }