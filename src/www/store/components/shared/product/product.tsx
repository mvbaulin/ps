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
      { title.has_offer_none &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.offer_none_original_price, title.offer_none_discount_price)}
            className={classNames(styles.price)}
          />
        </li>
      }

      { title.has_ps_plus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.ps_plus_original_price, title.ps_plus_discount_price)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='ps-plus' size={30}/>
        </li>
      }

      { title.has_ea_play &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.ea_play_original_price, title.ea_play_discount_price)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='ea-play' size={30}/>
        </li>
      }

      { title.has_gta_plus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.gta_plus_original_price, title.gta_plus_discount_price)}
            className={classNames(styles.price)}
          />
          <TitleBadge type='gta-plus' size={30}/>
        </li>
      }

      { title.has_ubisoft_plus &&
        <li className={classNames(styles.price_item)}>
          <Price
            price={getPrice(title.ubisoft_plus_original_price, title.ubisoft_plus_discount_price)}
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
          {formatedData.release_date ? formatedData.release_date : '---'}
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
          {title.screen_languages ? title.screen_languages : '---'}
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
