import Header from '../../components/Header/Header';
import TitleCover from '../../components/TitleCover/TitleCover';
import GeneralInfo from '../../sections/GeneralInfo/GeneralInfo';
import Selection from '../../components/Selection/Selection';
import {useEffect,  useState} from 'react';
import {useHistory} from '../../hooks/useHistory';
import {useTelegram} from '../../hooks/useTelegram';
import {useParams} from 'react-router-dom';
import {useApi} from '../../hooks/useApi';

const Title = () => {
  const {onBack} = useHistory();
  const {onShowMainButton} = useTelegram();
  const {getData} = useApi();
  const {id} = useParams();
  const [title, setTitle] = useState({});
  const [addons, setAddons] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [gameSubscriptions, setGameSubscriptions] = useState([]);
  const [gameCurrency, setGameCurrency] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    onBack();
    onShowMainButton();

    window.scrollTo(0, 0);
    let isMounted = true;

    const fetchData = async () => {
      const titleData = await getData(`title/${id}`);
      const addonsData = await getData(`addons/${id}`);
      const avatarsData = await getData(`avatars/${id}`);
      const bundlesData = await getData(`bundles/${id}`);
      const gameSubscriptionsData = await getData(`game_subscriptions/${id}`);
      const currencyData = await getData(`virtual_currency/${id}`);
      const gamesData = await getData(`games/${id}`);

      if (isMounted) {
        setTitle(titleData[0]);
        setAddons(addonsData);
        setAvatars(avatarsData);
        setBundles(bundlesData);
        setGameSubscriptions(gameSubscriptionsData);
        setGameCurrency(currencyData);
        setGames(gamesData);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(title);

  return (
    <>
      <Header />

      <TitleCover
        cover={title.cover}
        platforms={title.platforms}
      />

      <GeneralInfo
        {...title}
      />

      {games.length ?
        <Selection
          title="Другие издания"
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

      {gameCurrency.length ?
        <Selection
          title="Игровая валюта"
          items={gameCurrency}
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
        avatars.length ?
        <Selection
          title="Аватары"
          items={avatars}
        />
        : null
      }
    </>
  );
};

export default Title;
