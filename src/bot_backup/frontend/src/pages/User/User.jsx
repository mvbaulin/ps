import {useEffect} from 'react';
import {useHistory} from '../../hooks/useHistory';
import Profile from '../../sections/Profile/Profile';

const User = () => {
  const history = useHistory();

  useEffect(() => {
    history.onBack();
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Profile />
    </>
  );
};

export default User;
