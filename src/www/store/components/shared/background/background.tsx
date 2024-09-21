import Image from 'next/image';
import styles from './background.module.scss';

interface Props {
  image: string;
}

export const Background: React.FC<Props> = ({ image }) => {
  return (
    <Image
      src={image + '?w=1080&h=720'}
      alt="back"
      width={1080}
      height={720}
      className={styles.background}
    ></Image>
  );
};
