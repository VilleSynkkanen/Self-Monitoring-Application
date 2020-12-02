import { executeQuery } from "../database/database.js";

const getMorningReports = async() => {
  const res = await executeQuery("SELECT * FROM reports WHERE user_id = 1 AND type = 'morning';");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const getEveningReports = async() => {
  const res = await executeQuery("SELECT * FROM reports WHERE user_id = 1 AND type = 'evening';");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const getDoneInfo = async(dateFromToday) => {
  const result = await executeQuery(`SELECT type FROM reports WHERE user_id = 1 AND date = CURRENT_DATE + ${dateFromToday};`);
  let done = { morning: "not done", evening: "not done" };
  
  if (result && result.rowCount > 0) {
    const array = result.rowsOfObjects();
    array.forEach(element => {
      if(element.type == 'morning')
        done.morning = "done";
      else if(element.type == 'evening')
        done.evening = "done";
    });
  }

  return { morning: done.morning, evening: done.evening };
}

const getMoodForDay = async(dateFromToday) => {
  const result = await executeQuery(`SELECT AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = 1 AND date = CURRENT_DATE + ${dateFromToday};`);
  let avg = 0;
  if (result && result.rowCount > 0) {
    avg = result.rowsOfObjects()[0].generic_mood;
  }

  return {average: avg};
}

const getMoodTrend = async() => {
  const today = await getMoodForDay(0);
  const avgToday = today.average;
  const yesterday = await getMoodForDay(-1);
  const avgYesterday = yesterday.average;
  return { today: avgToday, yesterday: avgYesterday};
}

const insertMorningReport = async(date, sleep_duration, sleep_quality, generic_mood, user_id) => {
  const existingReport = await executeQuery("SELECT * FROM reports WHERE user_id = 1 AND date = $1 AND type = 'morning';", date);
  if(existingReport && existingReport.rowCount > 0)
  {
    // Found existing report
    const existing = existingReport.rowsOfObjects()[0];
    await executeQuery("UPDATE reports SET sleep_duration = $2, sleep_quality = $3, generic_mood = $4 WHERE user_id = $5 AND date = $1 AND type = 'morning';", 
      date, sleep_duration, sleep_quality, generic_mood, user_id);
  }
  else
  {
    await executeQuery("INSERT INTO reports (date, sleep_duration, sleep_quality, generic_mood, user_id, type) VALUES ($1, $2, $3, $4, $5, 'morning');", 
      date, sleep_duration, sleep_quality, generic_mood, user_id);
  }
  
}

const insertEveningReport = async(date, sports_duration, studying_duration, eating_regularity, eating_quality, generic_mood, user_id) => {
  const existingReport = await executeQuery("SELECT * FROM reports WHERE user_id = 1 AND date = $1 AND type = 'evening';", date);
  if(existingReport && existingReport.rowCount > 0)
  {
    // Found existing report
    const existing = existingReport.rowsOfObjects()[0];
    await executeQuery("UPDATE reports SET sports_duration = $2, studying_duration = $3, eating_regularity = $4, eating_quality = $5, generic_mood = $6 WHERE user_id = $7 AND date = $1 AND type = 'evening';", 
      date, sports_duration, studying_duration, eating_regularity, eating_quality, generic_mood, user_id);
  }
  else
  {
    await executeQuery("INSERT INTO reports (date, sports_duration, studying_duration, eating_regularity,\
      eating_quality, generic_mood, user_id, type) VALUES ($1, $2, $3, $4, $5, $6, $7, 'evening');", date, sports_duration, studying_duration, 
        eating_regularity, eating_quality, generic_mood, user_id);
  }
}

export { getMorningReports, getEveningReports, getMoodTrend, getMoodForDay, insertMorningReport, insertEveningReport, getDoneInfo };