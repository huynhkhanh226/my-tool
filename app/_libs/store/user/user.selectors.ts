import { RootState } from "../store";

export const selectUser = (state: RootState) => state.userState.user;
export const selectUserLoading = (state: RootState) => state.userState.loading;
export const selectUserError = (state: RootState) => state.userState.error;
