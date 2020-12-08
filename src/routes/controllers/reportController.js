import { getMoodTrend, getDoneInfo } from "../../services/reportService.js";

const today = () => {
  let date = new Date();
  return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

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
  render('morningForm.ejs', { email: (await session.get('user')).email, date: today(), passed: true, formData: {}, errors: {}});
};

const reportMorningFailed = async({render, session}, formData) => {
  render('morningForm.ejs', { email: (await session.get('user')).email, date: today(), passed: formData.passed, formData: formData.formData, errors: formData.errors});
};

const reportEvening = async({render, session}, formData = null) => {
  render('eveningForm.ejs', { email: (await session.get('user')).email, date: today()});
};
 
export { rootLandingPage, reportLandingPage, reportMorning, reportEvening, reportMorningFailed };