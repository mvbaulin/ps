import { getTitle } from '@/lib/prisma';
import classNames from 'classnames';
import styles from './page.module.scss';
import { getFormatedData, getPrice } from '@/lib/title';
import { Product } from '@/components/shared/product/product';
import { Background, Selection } from '@/components/shared';
import { redirect } from 'next/navigation';


export default async function Page(
  { params: { product } }:
  { params: { product: string } }) {

  const data = await getTitle(product);

  if (!data?.title.id) {
    redirect('/catalog');
  }

  const formatedData = getFormatedData(data.title);

  return (
    <main className={classNames('inner-page', styles.main)}>
      {data.title.background && (
        <Background image={data.title.background} />
      )}

      <Product title={data.title} formatedData={formatedData} />

      <Selection
        title='Издания'
        items={data.games}
      />

      <Selection
        title='Бандлы'
        items={data.bundles}
      />

      <Selection
        title='Дополнения'
        items={data.addons}
      />

      <Selection
        title='Виртуальная валюта'
        items={data.gameCurrency}
      />

    </main>
  );
}
