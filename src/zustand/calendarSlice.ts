import dayjs from 'dayjs';

export const createCalendarSlice = (set: any) => ({
  clickedDate: dayjs().format('YYYY-MM-DD'),
  setClickedDate: (newDate: string) =>
    set((state: any) => {
      state.clickedDate = newDate;
    }),
});
