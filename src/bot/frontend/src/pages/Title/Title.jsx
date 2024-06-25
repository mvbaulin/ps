import Header from '../../components/Header/Header';
import TitleCover from '../../components/TitleCover/TitleCover';
import GeneralInfo from '../../sections/GeneralInfo/GeneralInfo';
import {useEffect, useState} from 'react';
import {useHistory} from '../../hooks/useHistory';
import {useTelegram} from '../../hooks/useTelegram';
import {useParams} from 'react-router-dom';
import {useApi} from '../../hooks/useApi';

const Title = () => {
  const history = useHistory();
  const {onShowMainButton} = useTelegram();

  useEffect(() => {
    history.onBack();
    onShowMainButton();
  }, [])

  const {getData} = useApi();
  const {id} = useParams();
  const [title, setTitle] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getData(`title/${id}`);

      if (isMounted) {
        setTitle(data[0]);
        console.log(data);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

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
    </>
  );
};

export default Title;
