import { executeQuery } from "../database/database.js";

const getMorningReports = async() => {
  const res = await executeQuery("SELECT * FROM morning_reports WHERE user_id = 1;");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return 'No reports available';
}

const insertMorningReport = async(date, sleep_duration, sleep_quality, generic_mood, user_id) => {
  await executeQuery("INSERT INTO morning_reports (date, sleep_duration, sleep_quality, generic_mood, user_id) VALUES ($1, $2, $3, $4, $5);", 
    date, sleep_duration, sleep_quality, generic_mood, user_id);
}

export { getMorningReports, insertMorningReport };