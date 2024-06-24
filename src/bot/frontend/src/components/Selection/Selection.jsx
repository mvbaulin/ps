import Section from '../Section/Section';
import Slider from '../Slider/Slider';

const Selection = ({title}) => {
  let items = [
    {id: 1, title: 'first', price: 111, discount: 50, img: 'https://get.wallhere.com/photo/2560x1600-px-flowers-stones-zen-1743055.jpg', url: '/title'},
    {id: 2, title: 'kjfalkjflakfjalkj kajsflkj aljfkj kajs lkajfklaj askjfklasjfkajs kasjfl fjkajfaljf jfkajflkasj kfjaslf kjklfjalfj', price: 222, discount: 200, img: 'https://img.goodfon.ru/original/1728x972/b/c9/pole-nebo-gorizont-peyzazh.jpg', url: '/title'},
    {id: 3, title: 'third', price: 333, discount: 200, img: 'https://www.zastavki.com/pictures/originals/2014/World___USA_Wonderful_Yosemite_National_Park__California__USA_060738_.jpg', url: '/title'},
    {id: 4, title: 'forth', price: 444, discount: 200, img: 'https://wallbox.ru/wallpapers/main/201502/6034bcdddd14620.jpg', url: '/title'},
  ];
  
  return (
    <Section title={title}>
      <Slider items={items} />
    </Section>
  );
};

export default Selection;
