import { useAppSelector } from '../hooks';
import { selectUser, selectUserLoading, selectUserError } from '.';

export const useUser = () => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  return { user, loading, error };
};
