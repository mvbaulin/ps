import {useEffect, useState} from 'react';
import {useHistory} from '../../hooks/useHistory';
import {useTelegram} from '../../hooks/useTelegram';
import Section from '../../components/Section/Section';
import Layout from '../../components/Layout/Layout';
import Account from '../../components/Account/Account';
import ReserveCodes from '../../components/ReserveCodes/ReserveCodes';
import Reciept from '../../components/Reciept/Reciept';
import Promocode from '../../components/Promocode/Promocode';
import Choiser from '../../components/Choiser/Choiser';
import Info from '../../components/Info/Info';
import CartItem from '../../components/CartItem/CartItem';
import {useStorage} from '../../hooks/useStorage';
import classes from './Cart.module.css';

const Cart = () => {
  const {getItem} = useStorage();
  const [account, setAccount] = useState(getItem('buy_on_user_account') || 'new');
  const history = useHistory();
  const {onShowMainButton} = useTelegram();

  useEffect(() => {
    history.onBack();
    onShowMainButton();
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Section title="Корзина" additional="100 ₽">
        {/* <ul className={classes.cart}>
          {cart.length && cart.map((item) => {
            return <CartItem
              {...item}
              key={item.id}
            />
          })}
        </ul> */}

        <Layout>
          <Choiser onAccountChange={setAccount} />

          {account === 'user' && <Account />}
          {account === 'user' && <ReserveCodes />}
          {account === 'user' && <Reciept />}

          {account === 'new' &&
            <div className={classes.info}>
              <Info>
                Наш менеджер создаст для Вас турецкую учетную запись, оформит
                на него заказ и передаст Вам логин и пароль.
              </Info>
            </div>
          }

          <Promocode />
        </Layout>
      </Section>
    </>
  );
};

export default Cart;
