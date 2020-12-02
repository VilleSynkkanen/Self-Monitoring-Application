import { getMorningReports, getEveningReports, getMoodTrend, getMoodForDay, getDoneInfo } from "../../services/reportService.js";

const rootLandingPage = async({render, session}) => {
  let data;
  if(session && await session.get('authenticated'))
  {
    data = { report: await getMoodTrend(session), loggedIn: true };
  }
  else
  {
    data = { report: [], loggedIn: false };
  }
  
  render('rootLanding.ejs', data);
};

const reportLandingPage = async({render, session}) => {
  const data = await getDoneInfo(0, session);;
  render('reportLanding.ejs', data);
};

const reportMorning = async({render}) => {
  render('morningForm.ejs');
};

const reportEvening = async({render}) => {
  render('eveningForm.ejs');
};
 
export { rootLandingPage, reportLandingPage, reportMorning, reportEvening };