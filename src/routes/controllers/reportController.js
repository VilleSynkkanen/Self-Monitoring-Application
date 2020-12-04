import { getMoodTrend, getDoneInfo } from "../../services/reportService.js";

const rootLandingPage = async({render, session}) => {
  let data;
  if(session && await session.get('authenticated'))
  {
    data = { report: await getMoodTrend(session), loggedIn: true, email: (await session.get('user')).email };
  }
  else
  {
    data = { report: [], loggedIn: false, email: "" };
  }
  
  render('rootLanding.ejs', data);
};

const reportLandingPage = async({render, session}) => {
  let data = await getDoneInfo(session);
  data.email = (await session.get('user')).email;
  render('reportLanding.ejs', data);
};

const reportMorning = async({render, session}) => {
  render('morningForm.ejs', { email: (await session.get('user')).email });
};

const reportEvening = async({render, session}) => {
  render('eveningForm.ejs', { email: (await session.get('user')).email });
};
 
export { rootLandingPage, reportLandingPage, reportMorning, reportEvening };