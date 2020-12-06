import { getDefaultAverages, getAveragesFromWeek, getAveragesFromMonth } from "../../services/summaryService.js";

const summaryPage = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  let data = { weekly: false, monthly: false, def: true, email: (await session.get('user')).email };
  if(params)
  {
    const week = params.get('week');
    const month = params.get('month');
    
    const wk = week.split("-");
    if(wk.length > 1)
    {
      data.weekly = await getAveragesFromWeek(wk[1].substring(1), wk[0], session);
      data.week = week;
    }
    else
    {
      data.week = "empty";
    }
      
    const mth = month.split("-");
    if(mth.length > 1)
    {
      data.monthly = await getAveragesFromMonth(mth[1], mth[0], session);
      data.month = month;
    }
    else
    {
      data.month = "empty";
    }
    data.def = false;
  }
  else
  {
    data.weekly = await getDefaultAverages("week", session);
    data.monthly = await getDefaultAverages("month", session);
  }

  render('summaryPage.ejs', data);
};
 
export { summaryPage };