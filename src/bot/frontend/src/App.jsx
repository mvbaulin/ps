import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useTelegram} from './hooks/useTelegram';

import 'normalize.css';
import './fonts.css';
import './variables.css';
import './ThemeDark.css';

import Index from './pages/Index/Index'
import User from './pages/User/User'
import Search from './pages/Search/Search'
import Title from './pages/Title/Title'
import Cart from './pages/Cart/Cart'

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    window.scrollTo(0, 0);
    tg.ready();
    tg.expand();
  }, [])

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={'search'} element={<Search />} />
      <Route path={'user'} element={<User />} />
      <Route path={'cart'} element={<Cart />} />
      <Route path={'title/:id'} element={<Title />} />
    </Routes>
  );
}

export default App;
