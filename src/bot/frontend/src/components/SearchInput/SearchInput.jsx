import TitleCover from '../TitleCover/TitleCover';
import Selection from '../Selection/Selection';
import {useState, useEffect} from 'react';
import classes from './SearchInput.module.css';
import {useApi} from '../../hooks/useApi';
import {Link} from 'react-router-dom';

const SearchInput = ({limit = 5}) => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([]);
  const {getData} = useApi();

  const [addons, setAddons] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [gameSubscriptions, setGameSubscriptions] = useState([]);
  const [games, setGames] = useState([]);
  const [currency, setCurrency] = useState([]);

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
          setAddons(data.filter(item => item.product_type === 'Add-on'))
          setGameSubscriptions(data.filter(item => item.product_type === 'Subscription'))
          setGames(data.filter(item => item.product_type === 'Game'))
          setCurrency(data.filter(item => item.product_type === 'Virtual Currency'))
          setBundles(data.filter(item => item.product_type === 'Bundle'))
          setAvatars(data.filter(item => item.product_type === 'Avatar'))
        }

        console.log(data);
      };
      fetchData();

      return () => {
        isMounted = false;
      };
    } else {
      setSearch([]);
      setAddons([]);
      setGameSubscriptions([]);
      setGames([]);
      setCurrency([]);
      setBundles([]);
      setAvatars([]);
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
          {search.slice(0, limit).map((item) => {
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

      {games.length ?
        <Selection
          title="Игры"
          items={games}
        />
        : null
      }

      {
        bundles.length ?
        <Selection
        title="Бандлы"
        items={bundles}
        />
        : null
      }

      {addons.length ?
        <Selection
          title="Дополнения"
          items={addons}
        />
        : null
      }

      {
        gameSubscriptions.length ?
        <Selection
        title="Игровые подписки"
        items={gameSubscriptions}
        />
        : null
      }

      {
        currency.length ?
        <Selection
          title="Игровая валюта"
          items={currency}
          />
          : null
      }

      {
        avatars.length ?
        <Selection
          title="Аватары"
          items={avatars}
        />
        : null
      }

    </div>
  );
};

export default SearchInput;
