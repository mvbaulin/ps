import React from 'react';
import styles from './subscription-product.module.scss';
import { ISubscription } from '@/types/subscription';
import classNames from 'classnames';
import { Container, Image, Price } from '@/components/shared';
import { SubscriptionTypes } from '@/constants/constants';
import { Button, Dropdown } from '@/components/ui';
import { getPsPlusCoverByName, getSubscriptionPoints, getTermDescription } from '@/lib/subscription';
import { getPrice } from '@/lib/common';

interface Props {
  data: ISubscription[];
}

export const SubscriptionProduct: React.FC<Props> = ({
  data,
}) => {
  const commonData = {
    category: data[0].category,
    logo: data[0].logo,
    background: data[0].background,
    cover: data[0].cover,
    link: data[0].link,
    type: data[0].type as keyof typeof SubscriptionTypes,
    title: data[0].title
  };

  const category = commonData.category as SubscriptionTypes;

  const groupedData = data.reduce(
    (acc: Record<string, typeof data[0][]>, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    },
    {} as Record<string, typeof data[0][]>
  );

  const coverSize = {
    width: 720,
    height: 428
  };

  const cover = (
    <div className={classNames(styles.cover_wrapper)}>
      <Image
        src={commonData?.cover + `?w=${coverSize.width}&h=${coverSize.height}` || ''}
        alt={category}
        width={coverSize.width}
        height={coverSize.height}
        className={classNames(styles.cover)}
      />
    </div>
  );

  const title_name = (
    <h1 className={styles.title}>
      {commonData.title}
    </h1>
  );

  const psLayout = (
    <section className={classNames(styles.layout, styles['layout--ps'])}>
      {Object.keys(groupedData).reverse().map((name) => (
        <Dropdown
          key={name}
          title={name}
          transparent
          defaultOpen
          className={classNames(styles.dropdown)}
        >
          <div className={classNames(styles.content)}>
            <div className={classNames(styles.image_wrapper)}>
              <Image
                className={classNames(styles.cover)}
                src={getPsPlusCoverByName(name) || commonData.cover}
                alt={name}
                width={coverSize.width}
                height={coverSize.height}
              />
            </div>

            <ul className={classNames(styles.list)}>
              {groupedData[name].map((item) => (
                <li
                  key={item.id}
                  className={classNames(styles.item)}
                >
                  <div className={classNames(styles.left)}>
                    <div className={classNames(styles.price_item)}>
                      <Price
                        price={getPrice(item.originalPrice, item.discountPrice)}
                        className={classNames(styles.price)}
                      />
                    </div>


                    <div className={classNames(styles.info)}>
                      <span>
                        {getTermDescription(item.term)}
                      </span>
                    </div>
                  </div>

                  <div className={classNames(styles.right)}>
                    <div className={classNames(styles.buy)}>
                      <Button
                        className={classNames(styles.button)}
                      >
                        В корзину
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <ul className={classNames(styles.edition_content)}>
              {getSubscriptionPoints(name).map((item, index) => (
                <li className={classNames(styles.edition_content_item)} key={index}>
                  {item};
                </li>
              ))}
            </ul>

          </div>
        </Dropdown>
      ))}
    </section>
  );

  const gtaLayout = (
    <section className={classNames(styles.layout, styles['layout--gta'])}>
      {Object.keys(groupedData).reverse().map((name) => (
        <div className={classNames(styles.content)}>
          <ul className={classNames(styles.list)}>
            {groupedData[name].map((item) => (
              <li
                key={item.id}
                className={classNames(styles.item)}
              >
                <div className={classNames(styles.left)}>
                  <div className={classNames(styles.price_item)}>
                    <Price
                      price={getPrice(item.originalPrice, item.discountPrice)}
                      className={classNames(styles.price)}
                    />
                  </div>

                  <div className={classNames(styles.info)}>
                    <span>
                      {getTermDescription(item.term)}
                    </span>
                  </div>
                </div>

                <div className={classNames(styles.right)}>
                  <div className={classNames(styles.buy)}>
                    <Button
                      className={classNames(styles.button)}
                    >
                      В корзину
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ul className={classNames(styles.edition_content)}>
            {getSubscriptionPoints(name).map((item, index) => (
              <li className={classNames(styles.edition_content_item)} key={index}>
                {item};
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );

  const ubisoftLayout = (
    <section className={classNames(styles.layout, styles['layout--ubisoft'])}>
      {Object.keys(groupedData).reverse().map((name) => (
        <div className={classNames(styles.content)}>
          <ul className={classNames(styles.list)}>
            {groupedData[name].map((item) => (
              <li
                key={item.id}
                className={classNames(styles.item)}
              >
                <div className={classNames(styles.left)}>
                  <div className={classNames(styles.price_item)}>
                    <Price
                      price={getPrice(item.originalPrice, item.discountPrice)}
                      className={classNames(styles.price)}
                    />
                  </div>

                  <div className={classNames(styles.info)}>
                    <span>
                      {getTermDescription(item.term)}
                    </span>
                  </div>
                </div>

                <div className={classNames(styles.right)}>
                  <div className={classNames(styles.buy)}>
                    <Button
                      className={classNames(styles.button)}
                    >
                      В корзину
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ul className={classNames(styles.edition_content)}>
            {getSubscriptionPoints(name).map((item, index) => (
              <li className={classNames(styles.edition_content_item)} key={index}>
                {item};
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );

  const eaLayout = (
    <section className={classNames(styles.layout, styles['layout--ea'])}>
      {Object.keys(groupedData).reverse().map((name) => (
        <div className={classNames(styles.content)}>
          <ul className={classNames(styles.list)}>
            {groupedData[name].map((item) => (
              <li
                key={item.id}
                className={classNames(styles.item)}
              >
                <div className={classNames(styles.left)}>
                  <div className={classNames(styles.price_item)}>
                    <Price
                      price={getPrice(item.originalPrice, item.discountPrice)}
                      className={classNames(styles.price)}
                    />
                  </div>

                  <div className={classNames(styles.info)}>
                    <span>
                      {getTermDescription(item.term)}
                    </span>
                  </div>
                </div>

                <div className={classNames(styles.right)}>
                  <div className={classNames(styles.buy)}>
                    <Button
                      className={classNames(styles.button)}
                    >
                      В корзину
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ul className={classNames(styles.edition_content)}>
            {getSubscriptionPoints(name).map((item, index) => (
              <li className={classNames(styles.edition_content_item)} key={index}>
                {item};
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );

  const subs = (
    <>
      {category === SubscriptionTypes.PS_PLUS && psLayout}
      {category === SubscriptionTypes.GTA_PLUS && gtaLayout}
      {category === SubscriptionTypes.UBISOFT_PLUS && ubisoftLayout}
      {category === SubscriptionTypes.EA_PLAY && eaLayout}
    </>
  );

  return (
    <>
      <article className={classNames(styles.product, styles['product--mobile'])}>
        {cover}

        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.left)}>
              {title_name}
            </div>
          </div>

          {subs}
        </Container>
      </article>

      <article className={classNames(styles.product, styles['product--tablet'])}>
        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.inner)}>
              <div className={classNames(styles.header)}>
                <div className={classNames(styles.left)}>
                  {cover}
                </div>

                <div className={classNames(styles.right)}>
                  {title_name}
                </div>
              </div>
            </div>
          </div>

        </Container>
      </article>

      <article className={classNames(styles.product, styles['product--desktop'])}>
        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.inner)}>
              <div className={classNames(styles.header)}>
                <div className={classNames(styles.left)}>
                  {cover}
                </div>

                <div className={classNames(styles.right)}>
                  {title_name}
                </div>
              </div>
            </div>
          </div>

        </Container>
      </article>
    </>
  );
};
