/**
 * Форматирование даты
 * @param minutes
 * @returns {string}
 */
export const formattedTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours ? `${hours}ч ${remainingMinutes}м` : `${remainingMinutes}м`;
};
