import styles from './background.module.scss';

interface Props {
  image: string;
}

export const Background: React.FC<Props> = ({ image }) => {
  return (
    <div
      className={styles.paralax}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
};
