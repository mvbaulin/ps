import classNames from 'classnames';
import styles from './page.module.scss';
import { redirect } from 'next/navigation';
import { getSubscriptionByCategory } from '@/lib/subscription';
import { SubscriptionTypes } from '@/constants/constants';
import Image from 'next/image';
import { Section } from '@/components/shared';

export default async function Page(
  { params: { subscription } }:
  { params: { subscription: string } }) {

  const data = await getSubscriptionByCategory(subscription);

  if (!data) {
    redirect('/catalog');
  }

  const commonData = {
    category: data[0].category,
    logo: data[0].logo,
    background: data[0].background,
    link: data[0].link,
    type: data[0].type as keyof typeof SubscriptionTypes,
    title: data[0].title
  };

  const groupedData = data.length > 1;

  return (
    <main className={classNames('inner-page', styles.main)}>
      <Section title={commonData.title}>
        sfs3f
      </Section>
    </main>
  );
}
