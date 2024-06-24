import {useEffect} from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import {useHistory} from '../../hooks/useHistory';

const Search = () => {
  const history = useHistory();

  useEffect(() => {
    history.onBack();
  }, [])

  return (
    <>
      <SearchInput />
    </>
  );
};

export default Search;
