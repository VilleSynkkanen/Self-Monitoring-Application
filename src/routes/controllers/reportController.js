import { getMorningReports, insertMorningReport } from "../../services/reportService.js";

const reportMorning = async({render}) => {
  render('index.ejs');
};
 
export { reportMorning };