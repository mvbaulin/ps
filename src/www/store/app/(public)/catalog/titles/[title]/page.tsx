import classNames from 'classnames';
import styles from './page.module.scss';
import { getFormatedData, getTitle } from '@/lib/title';
import { Background } from '@/components/shared';
import { Selection, Product } from '@/components/layouts';
import { redirect } from 'next/navigation';

export default async function Page(
  context: { params: { title: string } }
) {
  const { params } = await context;
  const { title } = await params;

  const data = await getTitle(title);

  if (!data?.title?.id) {
    redirect('/catalog');
  }

  const formatedData = getFormatedData(data.title);

  return (
    <main className={classNames('inner-page', styles.main)}>
      {data.title.background && (
        <Background
          image={data.title.background}
        />
      )}

      <Product title={data.title} formatedData={formatedData} />

      <Selection
        title="Издания"
        items={data.games}
      />

      <Selection
        title="Бандлы"
        items={data.bundles}
      />

      <Selection
        title="Дополнения"
        items={data.addons}
      />

      <Selection
        title="Виртуальная валюта"
        items={data.gameCurrency}
      />
    </main>
  );
}
