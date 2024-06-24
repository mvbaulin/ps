import Header from '../../components/Header/Header';
import Subscriptions from '../../sections/Subscriptions/Subscriptions';
import Selection from '../../components/Selection/Selection';

const Index = () => {
  return (
    <>
      <Header />
      <Selection title="Лидеры продаж"/>
      <Subscriptions />
    </>
  );
};

export default Index;
