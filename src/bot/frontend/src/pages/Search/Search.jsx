import {useEffect} from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import {useHistory} from '../../hooks/useHistory';
import {useTelegram} from '../../hooks/useTelegram';

const Search = () => {
  const history = useHistory();
  const {onHideMainButton} = useTelegram();

  useEffect(() => {
    history.onBack();
    onHideMainButton();
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <SearchInput limit="5"/>
    </>
  );
};

export default Search;
