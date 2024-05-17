import React from 'react';
import { useTelegram } from "../../hooks/useTelegram";

const Header = (props) => {
  const {user} = useTelegram();

  return (
    <header>
      <span>{user?.userName}</span>
    </header>
  );
}

export default Header;
