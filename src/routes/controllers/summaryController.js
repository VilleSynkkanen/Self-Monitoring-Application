import { getDefaultAverages, getAveragesFromWeek, getAveragesFromMonth } from "../../services/summaryService.js";

const summaryPage = async({render, request}) => {
  const body = request.body();
  const params = await body.value;
  let data = { weekly: false, monthly: false};
  if(params)
  {
    const week = params.get('week');
    const month = params.get('month');
    //console.log("TIMES:");
    //console.log(week);
    //console.log(month);
    
    const wk = week.split("-");
    data.weekly = await getAveragesFromWeek(wk[1].substring(1), wk[0]);
    const mth = month.split("-");
    data.monthly = await getAveragesFromMonth(mth[1], mth[0]);
  }
  else
  {
    data.weekly = await getDefaultAverages("week", "CURRENT_TIMESTAMP");
    data.monthly = await getDefaultAverages("month", "CURRENT_TIMESTAMP");
  }

  render('summaryPage.ejs', data);
};
 
export { summaryPage };