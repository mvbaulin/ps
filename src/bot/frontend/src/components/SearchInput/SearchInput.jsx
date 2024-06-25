import TitleCover from '../TitleCover/TitleCover';
import {useState, useEffect} from 'react';
import classes from './SearchInput.module.css';
import {useApi} from '../../hooks/useApi';
import {Link} from 'react-router-dom';

const SearchInput = ({limit = 5}) => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([]);
  const {getData} = useApi();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length >= 3) {
      let isMounted = true;

      const fetchData = async () => {
        const data = await getData(`search/${input}`);
        if (isMounted) {
          setSearch(data);
        }

        console.log(data);
      };
      fetchData();

      return () => {
        isMounted = false;
      };
    } else {
      setSearch([]);
    }
  }, [input]);

  return (
    <div className={classes.search}>
      <div className={classes.wrapper}>
        <input
          className={classes.input}
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Поиск"
          autoFocus
        />
      </div>

      {
        search.length ?
        <ul className={classes.suggest}>
          {search.slice(0, limit).map((item, index) => {
            return (
              <li
                key={item.id}
                className={classes.item}
              >
                <Link to={`/title/${item.id}`}>
                  <div className={classes.content}>
                    <div className={classes.image_wrapper}>
                      <TitleCover
                        cover={item.cover}
                      />
                    </div>
                    <p className={classes.title}>
                      {item.title}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        :
        null
      }
    </div>
  );
};

export default SearchInput;
