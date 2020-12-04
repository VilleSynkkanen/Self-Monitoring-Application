import { executeQuery } from "../database/database.js";

// Gets averages from previous week/month
const getDefaultAverages = async(timePeriod, session) => {
  const id = (await session.get('user')).id;
  let result;
  if(timePeriod === 'week')
  {
    result = await executeQuery("SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND (date >= date_trunc('week', CURRENT_TIMESTAMP - interval '1 week') and date < date_trunc('week', CURRENT_TIMESTAMP));", id);
  }
  else if(timePeriod === 'month')
  {
    result = await executeQuery("SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND (date >= date_trunc('month', CURRENT_TIMESTAMP - interval '1 month') and date < date_trunc('month', CURRENT_TIMESTAMP));", id);
  }
  else
  {
    return {};
  }
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
  let result = await executeQuery('SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND extract(week FROM date) = $2 AND extract(year FROM date) = $3;', id, weekNumber, year);
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
  let result = await executeQuery('SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE user_id = $1 AND extract(month FROM date) = $2 AND extract(year FROM date) = $3;', id, monthNumber, year);
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

const getGeneralSummary = async() => {
  const res = await executeQuery("SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE (date > date_trunc('day', CURRENT_TIMESTAMP - interval '1 week'));");
  if (res && res.rowCount > 0) {
    let result = res.rowsOfObjects()[0];
    result.sleep_quality = Number(result.sleep_quality);
    result.eating_regularity = Number(result.eating_regularity);
    result.eating_quality = Number(result.eating_quality);
    result.generic_mood = Number(result.generic_mood);
    return result;
  }
  return {};
}

const getGeneralSummaryDay = async({params}) => {
  let month = params.month;
  if(month.length === 1)
  {
    month = "0" + params.month
  }
  let day = params.day;
  if(day.length === 1)
  {
    day = "0" + params.day;
  }

  const date = params.year + "-" + month + "-" + day;

  const res = await executeQuery("SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood FROM reports WHERE date = $1;", date);
  if (res && res.rowCount > 0) {
    let result = res.rowsOfObjects()[0];
    result.sleep_quality = Number(result.sleep_quality);
    result.eating_regularity = Number(result.eating_regularity);
    result.eating_quality = Number(result.eating_quality);
    result.generic_mood = Number(result.generic_mood);
    return result;
  }
  return {};
}

export { getGeneralSummary, getGeneralSummaryDay, getDefaultAverages, getAveragesFromWeek, getAveragesFromMonth }