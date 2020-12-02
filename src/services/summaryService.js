import { executeQuery } from "../database/database.js";

// Gets averages from previous week/month
const getDefaultAverages = async(timePeriod, timeStamp, session) => {
  const id = (await session.get('user')).id;
  let result = await executeQuery(`SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND (date >= date_trunc('${timePeriod}', ${timeStamp} - interval '1 ${timePeriod}') and date < date_trunc('${timePeriod}', ${timeStamp}));`, id);
  const data = { sleep_duration: false, sports_duration: false, studying_duration: false, sleep_quality: false, generic_mood: false};
  if (result && result.rowCount > 0) {
    result = result.rowsOfObjects()[0];
    data.sleep_duration = Number(result.sleep_duration);
    data.sleep_quality = Number(result.sleep_quality);
    data.generic_mood = Number(result.generic_mood);
    data.sports_duration = Number(result.sports_duration);
    data.studying_duration = Number(result.studying_duration);
  }

  return data;
}

const getAveragesFromWeek = async(weekNumber, year, session) => {
  const id = (await session.get('user')).id;
  let result = await executeQuery(`SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND extract(week FROM date) = ${weekNumber} AND extract(year FROM date) = ${year};`, id);
  const data = { sleep_duration: false, sports_duration: false, studying_duration: false, sleep_quality: false, generic_mood: false};
  if (result && result.rowCount > 0) {
    result = result.rowsOfObjects()[0];
    data.sleep_duration = Number(result.sleep_duration);
    data.sleep_quality = Number(result.sleep_quality);
    data.generic_mood = Number(result.generic_mood);
    data.sports_duration = Number(result.sports_duration);
    data.studying_duration = Number(result.studying_duration);
  }

  return data;
}

const getAveragesFromMonth = async(monthNumber, year, session) => {
  const id = (await session.get('user')).id;
  let result = await executeQuery(`SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND extract(month FROM date) = ${monthNumber} AND extract(year FROM date) = ${year};`, id);
  const data = { sleep_duration: false, sports_duration: false, studying_duration: false, sleep_quality: false, generic_mood: false};
  if (result && result.rowCount > 0) {
    result = result.rowsOfObjects()[0];
    data.sleep_duration = Number(result.sleep_duration);
    data.sleep_quality = Number(result.sleep_quality);
    data.generic_mood = Number(result.generic_mood);
    data.sports_duration = Number(result.sports_duration);
    data.studying_duration = Number(result.studying_duration);
  }

  return data;
}

export { getDefaultAverages, getAveragesFromWeek, getAveragesFromMonth }