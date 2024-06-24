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
  }, [])

  const cart = [
    {id: 1, title: 'first', price: 11123, discount: 50213, cover: 'https://get.wallhere.com/photo/2560x1600-px-flowers-stones-zen-1743055.jpg', url: '/title', platform_ps4: true, platform_ps5: true},
    {id: 2, title: 'kjfalkjflakfjalkj kajsflkj aljfkj kajs lkajfklaj askjfklasjfkajs kasjfl fjkajfaljf jfkajflkasj kfjaslf kjklfjalfj', price: 222, discount: 200, cover: 'https://img.goodfon.ru/original/1728x972/b/c9/pole-nebo-gorizont-peyzazh.jpg', url: '/title', platform_ps4: true,  platform_ps5: true},
    {id: 3, title: 'third', price: 333, discount: 200, cover: 'https://www.zastavki.com/pictures/originals/2014/World___USA_Wonderful_Yosemite_National_Park__California__USA_060738_.jpg', url: '/title', platform_ps4: true,  platform_ps5: false},
    {id: 4, title: 'forth', price: 444, discount: 200, cover: 'https://wallbox.ru/wallpapers/main/201502/6034bcdddd14620.jpg', url: '/title'},
  ];

  return (
    <>
      <Section title="Корзина" additional="100 ₽">
        <ul className={classes.cart}>
          {cart.length && cart.map((item) => {
            return <CartItem
              {...item}
              key={item.id}
            />
          })}
        </ul>

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
