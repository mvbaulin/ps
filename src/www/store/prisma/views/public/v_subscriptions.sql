SELECT
  id,
  category,
  name,
  title,
  term,
  term_description,
  original_price,
  discount_price,
  on_sale,
  updated_at,
  created_at
FROM
  subscriptions s
WHERE
  (on_sale IS TRUE);