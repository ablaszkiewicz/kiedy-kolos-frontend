import dayjs, { Dayjs } from 'dayjs';

export default function useCalendar() {
  const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];

  const getDaysInMonth = (offset: number) => {
    const cardsInCalendar = 39;
    const polishLocaleOffset = 1;
    const today = dayjs();
    const desiredDay: Dayjs = today.add(offset, 'month');
    const days: string[] = new Array(cardsInCalendar);
    const startDayOfMonth = daysOfWeek[desiredDay.startOf('month').day()]; // 1 - monday, 7 sunday

    const startingDay = desiredDay.startOf('month').subtract(startDayOfMonth - polishLocaleOffset, 'day');

    for (let i = 0; i < cardsInCalendar; i++) days[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');

    return days;
  };

  const getMonthName = (offset: number): string => {
    const today = dayjs();
    const desiredDay = today.add(offset, 'month');
    const month = desiredDay.format('MMMM');
    const monthUppercased = month.charAt(0).toUpperCase() + month.slice(1);

    return monthUppercased;
  };

  return { getDaysInMonth, getMonthName };
}
