import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "./user.api";
import { USER_GET_PROFILE } from "./user.types";
import { ThunkAPIConfig } from "@/app/_types/thunk";

// export const fetchUserProfile = createAsyncThunk(
//   USER_GET_PROFILE,
//   async (email: string) => {
//     return await getUserProfile(email);
//   }
// );

type UserProfile = {
  email: string;
  name: string;
};

export type Args = {
  onSuccess?: (data: UserProfile) => void;
  onError?: (err: string) => void;
};

// Gọi trực tiếp action -> có khả năng lội API key
// Vì vậy nên gọi thông qua

export const fetchUserProfile = createAsyncThunk<UserProfile, Args, ThunkAPIConfig<string>>(
  USER_GET_PROFILE,
  async (args, thunkAPI) => {
    try {
      const data = await getUserProfile();
      args.onSuccess?.(data);
      return data.user || null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.message || 'Lỗi không xác định';
      args.onError?.(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
