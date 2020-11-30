import { getMorningReports, getEveningReports, getMoodTrend, getMoodForDay } from "../../services/reportService.js";

const rootLandingPage = async({render}) => {
  const data = await getMoodTrend();
  render('rootLanding.ejs', data);
};

const reportLandingPage = async({render}) => {
  const data = await getMoodForDay(0);;
  render('reportLanding.ejs', data);
};

const reportMorning = async({render}) => {
  render('morningForm.ejs');
};

const reportEvening = async({render}) => {
  render('eveningForm.ejs');
};
 
export { rootLandingPage, reportLandingPage, reportMorning, reportEvening };