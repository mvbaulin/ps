import Header from '../../components/Header/Header';
import TitleCover from '../../components/TitleCover/TitleCover';
import GeneralInfo from '../../sections/GeneralInfo/GeneralInfo';
import {useEffect} from 'react';
import {useHistory} from '../../hooks/useHistory';
import {useTelegram} from '../../hooks/useTelegram';

const Title = () => {
  const history = useHistory();
  const {onShowMainButton} = useTelegram();

  useEffect(() => {
    history.onBack();
    onShowMainButton();
  }, [])

  const platforms = {
    platform_ps4: true,
    platform_ps5: true
  }

  return (
    <>
      <Header />

      <TitleCover
        coverUrl="https://get.wallhere.com/photo/2560x1600-px-flowers-stones-zen-1743055.jpg"
        {...platforms}
      />

      <GeneralInfo
        title="title"
      />
    </>
  );
};

export default Title;
