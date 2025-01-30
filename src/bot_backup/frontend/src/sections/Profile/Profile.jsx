import Section from '../../components/Section/Section';
import Layout from '../../components/Layout/Layout';
import Account from '../../components/Account/Account';
import ReserveCodes from '../../components/ReserveCodes/ReserveCodes';
import Reciept from '../../components/Reciept/Reciept';
import Promocode from '../../components/Promocode/Promocode';

const Profile = () => {
  return (
    <Section title="Личный кабинет">
      <Layout>
        <Account />
        <ReserveCodes />
        <Reciept />
        <Promocode />
      </Layout>
    </Section>
  );
};

export default Profile;
