import { SignInForm } from '@/components/shared';
import styles from './page.module.scss';


export default function Page() {
  return (
    <main className={styles.page}>
      <SignInForm />
    </main>
  );
}
