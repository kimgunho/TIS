export const getDate = (date: string) => {
  const newDate = new Date(date);
  const year: number = newDate.getFullYear();
  const month: string = String(newDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(newDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const getTime = (date: string) => {
  const newDate = new Date(date);
  const hours: string = String(newDate.getHours()).padStart(2, '0');
  const minutes: string = String(newDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
