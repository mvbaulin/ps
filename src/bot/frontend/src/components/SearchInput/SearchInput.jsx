import TitleCover from '../TitleCover/TitleCover';
import {useState} from 'react';
import classes from './SearchInput.module.css';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const items = [
    {id: 1, title: 'first', price: 11123, discount: 50213, cover: 'https://get.wallhere.com/photo/2560x1600-px-flowers-stones-zen-1743055.jpg', url: '/title', platform_ps4: true, platform_ps5: true},
    {id: 2, title: 'kjfalkjflakfjalkj kajsflkj aljfkj kajs lkajfklaj askjfklasjfkajs kasjfl fjkajfaljf jfkajflkasj kfjaslf kjklfjalfj', price: 222, discount: 200, cover: 'https://img.goodfon.ru/original/1728x972/b/c9/pole-nebo-gorizont-peyzazh.jpg', url: '/title', platform_ps4: true,  platform_ps5: true},
    {id: 3, title: 'third', price: 333, discount: 200, cover: 'https://www.zastavki.com/pictures/originals/2014/World___USA_Wonderful_Yosemite_National_Park__California__USA_060738_.jpg', url: '/title', platform_ps4: true,  platform_ps5: false},
    {id: 4, title: 'forth', price: 444, discount: 200, cover: 'https://wallbox.ru/wallpapers/main/201502/6034bcdddd14620.jpg', url: '/title'},
  ];

  return (
    <div className={classes.search}>
      <div className={classes.wrapper}>
        <input
          className={classes.input}
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Поиск"
          autoFocus
        />
      </div>

      <ul className={classes.suggest}>
        {
          items.map((item) => {
            return (
              <li key={item.id} className={classes.item}>
                <div className={classes.inner}>
                  <TitleCover
                    coverUrl={item.cover}
                  />
                </div>
                <p className={classes.title}>{item.title}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default SearchInput;
