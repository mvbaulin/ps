import {useEffect} from 'react';
import {useHistory} from '../../hooks/useHistory';
import Profile from '../../sections/Profile/Profile';

const User = () => {
  const history = useHistory();

  useEffect(() => {
    history.onBack();
  }, [])

  return (
    <>
      <Profile />
    </>
  );
};

export default User;
