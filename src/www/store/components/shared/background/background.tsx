import Image from 'next/image';
import styles from './background.module.scss';
import classNames from 'classnames';

interface Props {
  image: string;
}

export const Background: React.FC<Props> = ({ image }) => {
  const imageSize = {
    width: 1920,
    height: 1080
  }

  return (
    <Image
      src={image + `?w=${imageSize.width}&h=${imageSize.height}`}
      alt="back"
      width={imageSize.width}
      height={imageSize.height}
      className={classNames(styles.background)}
      priority
    ></Image>
  );
};
