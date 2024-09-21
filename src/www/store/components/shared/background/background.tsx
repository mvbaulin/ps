import Image from 'next/image';
import styles from './background.module.scss';

interface Props {
  image: string;
}

export const Background: React.FC<Props> = ({ image }) => {
  return (
    <Image
      src={image}
      alt="back"
      width={720}
      height={480}
      className={styles.background}
    ></Image>
  );
};
