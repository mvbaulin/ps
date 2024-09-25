import React from 'react';
import {IFormattedData, ITitle } from '@/types/title'
import classNames from 'classnames';
import styles from './product.module.scss';
import { Container, Image, Price, TitleBadge, StarRating } from '@/components/shared';
import { IconButton } from '@/components/ui';
import { getPrice } from '@/lib/title';

interface Props {
  title: ITitle,
  formatedData: IFormattedData
}

export const Product: React.FC<Props> = ({
  title,
  formatedData
}) => {
  const title_name = (
    <h1 className={styles.title}>
      {title.title}
    </h1>
  );

  const cover = (
    <div className={styles.cover_wrapper}>

      {(formatedData?.platforms?.ps4 || formatedData?.platforms?.ps5) &&
        <div className={styles.platforms}>
          {formatedData?.platforms?.ps4 &&
            TitleBadge({ type: 'ps4-3', size: 18, className: styles.platform })
          }

          {formatedData?.platforms?.ps5 &&
            TitleBadge({ type: 'ps5-3', size: 18, color: '#000000', className: styles.platform })
          }
        </div>
      }

      <Image
        src={title.cover + '?w=720&h=428' || ''}
        alt={title.title || title?.id}
        width={720}
        height={428}
        className={styles.cover}
        priority
      />
    </div>
  );

  const prices = (
    <ul className={classNames(styles.prices)}>
      { title.hasOfferNone &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.offerNoneOriginalPrice, title.offerNoneDiscountPrice)}
            className={classNames(styles.price)}
          />
        </li>
      }

      { title.hasPsPlus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.psPlusOriginalPrice, title.psPlusDiscountPrice)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='ps-plus' size={30}/>
        </li>
      }

      { title.hasEaPlay &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.eaPlayOriginalPrice, title.eaPlayDiscountPrice)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='ea-play' size={30}/>
        </li>
      }

      { title.hasGtaPlus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.gtaPlusOriginalPrice, title.gtaPlusDiscountPrice)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='gta-plus' size={30}/>
        </li>
      }

      { title.hasUbisoftPlus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.ubisoftPlusOriginalPrice, title.ubisoftPlusDiscountPrice)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='ubisoft-plus' size={30}/>
        </li>
      }
    </ul>
  );

  const rating = (
    <div className={classNames(styles.rating)}>
      <StarRating rating={title.rating} />

      {
        title.users &&
        <div className={classNames(styles.users)}>
          Оценки: {title.users}
        </div>
      }

      <IconButton
        type="favorites">
          Добавить в избранное
      </IconButton>
    </div>
  );

  const edition_content = (
    <div className={classNames(styles.edition_content)}>
      <p className={classNames(styles.edition_content_title)}>
        {/* Издание включает в себя: */}
      </p>

      <ul className={classNames(styles.edition_content_list)}>
        {formatedData.editionContent.map((item, index) => (
          <li className={classNames(styles.edition_content_item)} key={index}>
            {item};
          </li>
        ))}
      </ul>
    </div>
  );

  const generalInfo = (
    <div className={classNames(styles.table)}>
      <div className={classNames(styles.table_row)}>
        <span className={classNames(styles.table_key)}>Жанр:</span>
        <span className={classNames(styles.table_value)}>
          {title.genres ? title.genres : '---'}
        </span>
      </div>

      <div className={classNames(styles.table_row)}>
        <span className={classNames(styles.table_key)}>Платформа:</span>
        <span className={classNames(styles.table_value)}>
          {title.platforms ?`${title.platforms}` : '---'}
        </span>
      </div>

      <div className={classNames(styles.table_row)}>
        <span className={classNames(styles.table_key)}>Дата релиза:</span>
        <span className={classNames(styles.table_value)}>
          {formatedData.releaseDate ? formatedData.releaseDate : '---'}
        </span>
      </div>

      <div className={classNames(styles.table_row)}>
        <span className={classNames(styles.table_key)}>Озвучка:</span>
        <span className={classNames(styles.table_value)}>
          {title.voice ? title.voice : '---'}
        </span>
      </div>

      <div className={classNames(styles.table_row)}>
        <span className={classNames(styles.table_key)}>Субтитры:</span>
        <span className={classNames(styles.table_value)}>
          {title.screenLanguages ? title.screenLanguages : '---'}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <article className={classNames(styles.product, styles['product--mobile'])}>
        {cover}

        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.left)}>
              {title_name}
              {edition_content}
              {prices}
            </div>

            <div className={classNames(styles.right)}>
              {rating}
            </div>
          </div>

          {generalInfo}
        </Container>
      </article>

      <article className={classNames(styles.product, styles['product--tablet'])}>
        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.inner)}>
              <div className={classNames(styles.top)}>
                <div className={classNames(styles.left)}>
                  {cover}
                  {rating}
                </div>

                <div className={classNames(styles.right)}>
                  {title_name}
                  {edition_content}
                  {prices}
                </div>
              </div>
            </div>
            {generalInfo}
          </div>

        </Container>
      </article>

      <article className={classNames(styles.product, styles['product--desktop'])}>
        <Container>
          <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.inner)}>
              <div className={classNames(styles.top)}>
                <div className={classNames(styles.left)}>
                  {cover}
                  {rating}
                </div>

                <div className={classNames(styles.right)}>
                  {title_name}
                  {edition_content}
                  {prices}
                </div>
              </div>
            </div>

            {generalInfo}
          </div>

        </Container>
      </article>
    </>
  );
};
