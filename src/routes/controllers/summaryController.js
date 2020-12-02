import { getDefaultAverages, getAveragesFromWeek, getAveragesFromMonth } from "../../services/summaryService.js";

const summaryPage = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;
  let data = { weekly: false, monthly: false};
  if(params)
  {
    const week = params.get('week');
    const month = params.get('month');
    
    const wk = week.split("-");
    data.weekly = await getAveragesFromWeek(wk[1].substring(1), wk[0], session);
    const mth = month.split("-");
    data.monthly = await getAveragesFromMonth(mth[1], mth[0], session);
  }
  else
  {
    data.weekly = await getDefaultAverages("week", "CURRENT_TIMESTAMP", session);
    data.monthly = await getDefaultAverages("month", "CURRENT_TIMESTAMP", session);
  }

  render('summaryPage.ejs', data);
};
 
export { summaryPage };