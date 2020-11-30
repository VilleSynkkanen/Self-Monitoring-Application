import { getWeeklyAverages } from "../../services/summaryService.js";

const summaryPage = async({render}) => {
  let data = { weekly: false, monthly: false};
  data.weekly = await getWeeklyAverages("week");
  data.monthly = await getWeeklyAverages("month");
  console.log("DATA:");
  console.log(data);
  render('summaryPage.ejs', data);
};
 
export { summaryPage };