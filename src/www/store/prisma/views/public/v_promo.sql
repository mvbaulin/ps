SELECT
  id,
  title,
  concept_id,
  url,
  cover,
  background,
  rating,
  description,
  legal,
  users,
  platforms,
  release_date,
  publisher,
  genres,
  voice,
  screen_languages,
  content,
  short_id,
  product_type,
  has_offer_none,
  has_ps_plus,
  has_ea_access,
  has_ubisoft_plus,
  has_gta_plus,
  offer_none_original_price,
  offer_none_discount_price,
  ps_plus_original_price,
  ps_plus_discount_price,
  ubisoft_plus_original_price,
  ubisoft_plus_discount_price,
  ea_access_original_price,
  ea_access_discount_price,
  gta_plus_original_price,
  gta_plus_discount_price,
  on_sale,
  updated_at,
  created_at
FROM
  titles t
WHERE
  (
    (id) :: text = ANY (
      (
        ARRAY ['EP1004-PPSA01721_00-GTAOANDSPUPGRADE'::character varying, 'EP0001-PPSA22100_00-GAME000000000000'::character varying, 'EP9000-CUSA03173_00-BLOODBORNE0000EU'::character varying, 'EP9000-PPSA08338_00-MARVELSPIDERMAN2'::character varying]
      ) :: text []
    )
  )
ORDER BY
  users;