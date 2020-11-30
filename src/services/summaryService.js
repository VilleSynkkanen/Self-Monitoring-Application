import { executeQuery } from "../database/database.js";

const getWeeklyAverages = async(timePeriod) => {
  
  let morning = await executeQuery(`SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(generic_mood) AS generic_mood, COUNT(*) AS count FROM morning_reports WHERE user_id = 1 AND (date >= date_trunc('${timePeriod}', CURRENT_TIMESTAMP - interval '1 ${timePeriod}') and date < date_trunc('${timePeriod}', CURRENT_TIMESTAMP));`);
  let evening = await executeQuery(`SELECT AVG(sports_duration) AS sports_duration, AVG(studying_duration) AS studying_duration, AVG(eating_regularity) AS eating_regularity, AVG(eating_quality) AS eating_quality, AVG(generic_mood) AS generic_mood, COUNT(*) AS count FROM evening_reports WHERE user_id = 1 AND (date >= date_trunc('${timePeriod}', CURRENT_TIMESTAMP - interval '1 ${timePeriod}') and date < date_trunc('${timePeriod}', CURRENT_TIMESTAMP));`);
  const data = { sleep_duration: false, sports_duration: false, studying_duration: false, sleep_quality: false, generic_mood: false, mood_count: 0 };
  if (morning && morning.rowCount > 0) {
    morning = morning.rowsOfObjects()[0];
    data.sleep_duration = morning.sleep_duration;
    data.sleep_quality = Number(morning.sleep_quality);
    data.generic_mood = morning.generic_mood;
    data.mood_count += Number(morning.count);
  }
  if (evening && evening.rowCount > 0) {
    evening = evening.rowsOfObjects()[0];
    data.sports_duration = evening.sports_duration;
    data.studying_duration = evening.studying_duration;
    data.mood_count += Number(evening.count);
    if(!data.generic_mood)
    {
        data.generic_mood = evening.generic_mood;
    }
    // Calculate mood average based on counts
    else
    {
        const eveningWeightCoefficient = evening.count / data.mood_count;
        data.generic_mood = evening.generic_mood * eveningWeightCoefficient + (1 - eveningWeightCoefficient) * data.generic_mood;
    }
  }

  return data;
}

export { getWeeklyAverages }