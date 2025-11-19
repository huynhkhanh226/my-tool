import { AppDispatch, RootState } from "../_libs/store/store";

export type ThunkAPIConfig<RejectType = unknown> = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: RejectType;
};
