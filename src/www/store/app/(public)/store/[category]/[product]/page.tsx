import { getTitle } from '@/lib/prisma';
import classNames from 'classnames';
import styles from './page.module.scss';
import NextImage from 'next/image';
import { Container, Image, Price, Selection, TitleBadge } from '@/components/shared';
import { Button, IconButton } from '@/components/ui';
import { getFormatedData, getPrice } from '@/lib/title';

export default async function Page(
  { params: { product } }:
  { params: { product: string } }) {

  const data = await getTitle(product);
  const formatedData = getFormatedData(data.title);

  return (
    <main className={classNames('inner-page', styles.main)}>
      {data.title.background && (
        <div className={classNames(styles.background_wrapper)}>
            <NextImage
              src={data.title.background || '#'}
              alt={data.title.title || data.title?.id}
              width={1920}
              height={1080}
              className={classNames(styles.background)}
            />
        </div>
      )}

      <Container noMobile>
        <div className={classNames(styles.cover_wrapper)}>
          <NextImage
            src={data.title.cover || '#'}
            alt={data.title.title || data.title?.id}
            width={1920}
            height={1080}
            className={classNames(styles.cover)}
          />
        </div>
      </Container>

      <section className={classNames(styles.content)}>
        <Container>
          <div className={classNames(styles.header)}>
            <div className={classNames(styles.header_inner)}>
              <h1 className={classNames(styles.product_title)}>
                {data.title.title}
              </h1>

              { formatedData.platforms.ps4 &&
                <TitleBadge type={'ps4-3'} className={classNames(styles.platform)} />
              }

              { formatedData.platforms.ps5 &&
                <TitleBadge type={'ps5-3'} />
              }
            </div>

            <IconButton type='like' size={50} >Нравится</IconButton>
          </div>


          <ul className={classNames(styles.prices)}>
            { data.title.has_offer_none &&
              <li className={classNames(styles.price_item)}>
                <Price
                  price={getPrice(data.title.offer_none_original_price, data.title.offer_none_discount_price)}
                  className={classNames(styles.price)}
                />
              </li>
            }

            { data.title.has_ps_plus &&
              <li className={classNames(styles.price_item)}>
                <Price
                  price={getPrice(data.title.ps_plus_original_price, data.title.ps_plus_discount_price)}
                  className={classNames(styles.price)}
                />
                <TitleBadge type='ps-plus' size={30}/>
              </li>
            }

            { data.title.has_ea_play &&
              <li className={classNames(styles.price_item)}>
                <Price
                  price={getPrice(data.title.ea_play_original_price, data.title.ea_play_discount_price)}
                  className={classNames(styles.price)}
                />
                <TitleBadge type='ea-play' />
              </li>
            }

            { data.title.has_gta_plus &&
              <li className={classNames(styles.price_item)}>
                <Price
                  price={getPrice(data.title.gta_plus_original_price, data.title.gta_plus_discount_price)}
                  className={classNames(styles.price)}
                />
                <TitleBadge type='gta-plus' />
              </li>
            }

            { data.title.has_ubisoft_plus &&
              <li className={classNames(styles.price_item)}>
                <Price
                  price={getPrice(data.title.ubisoft_plus_original_price, data.title.ubisoft_plus_discount_price)}
                  className={classNames(styles.price)}
                />
                <TitleBadge type='ubisoft-plus' />
              </li>
            }
          </ul>

          <div className={classNames(styles.table)}>
            <div className={classNames(styles.table_row)}>
              <span className={classNames(styles.table_key)}>Жанр:</span>
              <span className={classNames(styles.table_value)}>
                {data.title.genres ? data.title.genres : '---'}
              </span>
            </div>

            <div className={classNames(styles.table_row)}>
              <span className={classNames(styles.table_key)}>Дата релиза:</span>
              <span className={classNames(styles.table_value)}>
                {/* {String(data.title.release_date)} */}
                release date
              </span>
            </div>

            <div className={classNames(styles.table_row)}>
              <span className={classNames(styles.table_key)}>Озвучка:</span>
              <span className={classNames(styles.table_value)}>
                {data.title.voice ? data.title.voice : '---'}
              </span>
            </div>

            <div className={classNames(styles.table_row)}>
              <span className={classNames(styles.table_key)}>Субтитры:</span>
              <span className={classNames(styles.table_value)}>
                {data.title.screen_languages ? data.title.screen_languages : '---'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Selection
        title="Другие издания"
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
        title="Игровая валюта"
        items={data.gameCurrency}
      />
    </main>
  );
}
