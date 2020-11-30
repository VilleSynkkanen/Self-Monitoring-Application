import { executeQuery } from "../database/database.js";

const getMorningReports = async() => {
  const res = await executeQuery("SELECT * FROM morning_reports WHERE user_id = 1;");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const getEveningReports = async() => {
  const res = await executeQuery("SELECT * FROM evening_reports WHERE user_id = 1;");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const getMoodForDay = async(dateFromToday) => {
  const morning = await executeQuery(`SELECT generic_mood FROM morning_reports WHERE user_id = 1 AND date = CURRENT_DATE + ${dateFromToday};`);
  const evening = await executeQuery(`SELECT generic_mood FROM evening_reports WHERE user_id = 1 AND date = CURRENT_DATE + ${dateFromToday};`);
  let avg = 0;
  let count = 0;
  let done = { morning: "not done", evening: "not done" };
  if (morning && morning.rowCount > 0) {
    avg += morning.rowsOfObjects()[0].generic_mood;
    count++;
    done.morning = "done";
  }
  if (evening && evening.rowCount > 0) {
    avg += evening.rowsOfObjects()[0].generic_mood;
    count++;
    done.evening = "done";
  }
  if(count > 0)
  {
    avg /= count;
  }

  return {average: avg, morning: done.morning, evening: done.evening };
}

const getMoodTrend = async() => {
  const today = await getMoodForDay(0);
  const avgToday = today.average;
  const yesterday = await getMoodForDay(-1);
  const avgYesterday = yesterday.average;
  return { today: avgToday, yesterday: avgYesterday};
}

const insertMorningReport = async(date, sleep_duration, sleep_quality, generic_mood, user_id) => {
  await executeQuery("INSERT INTO morning_reports (date, sleep_duration, sleep_quality, generic_mood, user_id) VALUES ($1, $2, $3, $4, $5);", 
    date, sleep_duration, sleep_quality, generic_mood, user_id);
}

const insertEveningReport = async(date, sports_duration, studying_duration, eating_regularity, eating_quality, generic_mood, user_id) => {
  await executeQuery("INSERT INTO evening_reports (date, sports_duration, studying_duration, eating_regularity,\
    eating_quality, generic_mood, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);", date, sports_duration, studying_duration, 
      eating_regularity, eating_quality, generic_mood, user_id);
}

export { getMorningReports, getEveningReports, getMoodTrend, getMoodForDay, insertMorningReport, insertEveningReport };