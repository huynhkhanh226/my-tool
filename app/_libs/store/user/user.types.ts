export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const USER_GET_PROFILE = "user/getProfile";
