import dayjs, { Dayjs } from 'dayjs';

export const createCalendarSlice = (set: any) => ({
  clickedDate: dayjs(),
  setClickedDate: (newDate: Dayjs) =>
    set((state: any) => {
      state.clickedDate = newDate;
    }),
});
