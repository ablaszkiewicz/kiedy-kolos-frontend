import dayjs, { Dayjs } from 'dayjs';

export const createCalendarSlice = (set: any) => ({
  clickedDate: dayjs(),
  setClickedDate: (newDate: Dayjs) =>
    set((state: any) => {
      state.clickedDate = newDate;
    }),
  visibleGroupIds: [] as string[],
  addVisibleGroupId: (newVisibleGroupId: string) => {
    set((state: any) => {
      state.visibleGroupIds = [...new Set([...state.visibleGroupIds, newVisibleGroupId])];
    });
  },
  removeVisibleGroupId: (groupId: string) => {
    set((state: any) => {
      state.visibleGroupIds = state.visibleGroupIds.filter((id: string) => id !== groupId);
    });
  },
});
