import { useAppSelector } from "../hooks";
import { selectUser, selectUserLoading, selectUserError } from "./user.selectors";

export const useUser = () => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  return { user, loading, error };
};
