import Header from '../../components/Header/Header';
import Subscriptions from '../../sections/Subscriptions/Subscriptions';
import Selection from '../../components/Selection/Selection';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';

const Index = () => {
  const {getData} = useApi();
  const [hots, setHots] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getData('selection/pupalar_new');
      if (isMounted) {
        setHots(data);
      }
    };
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <>
      <Header />
      <Selection
        title="Горячие новинки"
        items={hots}
      />
      <Subscriptions />
    </>
  );
};

export default Index;
