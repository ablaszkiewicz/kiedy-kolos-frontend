import dayjs from 'dayjs';

export default function useCalendar() {
  const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];

  const getDaysInMonth = (offset: number) => {
    const today = dayjs();
    const desiredDay = today.add(offset, 'month');
    const daysTemp = new Array(42);
    const startDayOfMonth = daysOfWeek[desiredDay.startOf('month').day()]; // 1 - monday, 7 sunday

    const startingDay = desiredDay.startOf('month').subtract(startDayOfMonth - 1, 'day');

    for (let i = 0; i < 39; i++) daysTemp[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');

    return daysTemp;
  };

  return { getDaysInMonth };
}
