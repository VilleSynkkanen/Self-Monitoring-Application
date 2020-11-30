import { getAverages } from "../../services/summaryService.js";

const summaryPage = async({render, request}) => {
  const body = request.body();
  const params = await body.value;
  let week_timestamp = "CURRENT_TIMESTAMP";
  let month_timestamp = "CURRENT_TIMESTAMP";
  if(params)
  {
    const week = params.get('week');
    const month = params.get('month');
    console.log("TIMES:");
    console.log(week);
    console.log(month);
    // Parse week & month and convert them into a timestamp that corresponds to the next week
    let wk = week.split("-");
    const week_date = `TO_DATE(CONCAT(${wk[0]}, ${Number(wk[1].substring(1)) + 1}), 'IYYYIW')`;
    week_timestamp = `${week_date} + '00:00:01'::time`;

    // TODO: select month
  }
  
  let data = { weekly: false, monthly: false};
  data.weekly = await getAverages("week", week_timestamp);
  data.monthly = await getAverages("month", month_timestamp);
  //console.log("DATA:");
  //console.log(data);
  render('summaryPage.ejs', data);
};
 
export { summaryPage };