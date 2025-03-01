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
  has_ea_play,
  has_ubisoft_plus,
  has_gta_plus,
  offer_none_original_price,
  offer_none_discount_price,
  ps_plus_original_price,
  ps_plus_discount_price,
  ubisoft_plus_original_price,
  ubisoft_plus_discount_price,
  ea_play_original_price,
  ea_play_discount_price,
  gta_plus_original_price,
  gta_plus_discount_price,
  on_sale,
  updated_at,
  created_at
FROM
  titles t
WHERE
  (on_sale IS TRUE);