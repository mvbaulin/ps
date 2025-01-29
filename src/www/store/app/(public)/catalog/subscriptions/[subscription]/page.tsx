import classNames from 'classnames';
import styles from './page.module.scss';
import { redirect } from 'next/navigation';
import { getSubscriptionByCategory } from '@/lib/subscription';
import { SubscriptionProduct } from '@/components/layouts';

export default async function Page(
  context: { params: { subscription: string } }
) {
  const { params } = await context;
  const { subscription } = await params;

  const data = await getSubscriptionByCategory(subscription);

  if (!data) {
    redirect('/catalog');
  }

  return (
    <main className={classNames('inner-page', styles.main)}>
      <SubscriptionProduct
        data={data}
      />
    </main>
  );
}
