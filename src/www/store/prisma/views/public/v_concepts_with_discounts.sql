WITH sorted_titles AS (
  SELECT
    DISTINCT c.id AS concept_id,
    c.title_name,
    c.concept_name,
    c.title_url,
    c.cover_url AS title_cover,
    t.release_date
  FROM
    (
      titles t
      JOIN concepts c ON ((t.concept_id = c.id))
    )
  WHERE
    (
      (t.on_sale = TRUE)
      AND (
        (
          t.offer_none_discount_price <> t.offer_none_original_price
        )
        OR (
          t.ps_plus_discount_price <> t.ps_plus_original_price
        )
        OR (
          t.gta_plus_discount_price <> t.gta_plus_original_price
        )
        OR (
          t.ea_access_discount_price <> t.ea_access_original_price
        )
        OR (
          t.ubisoft_plus_discount_price <> t.ubisoft_plus_original_price
        )
      )
    )
)
SELECT
  concept_id,
  title_name,
  concept_name,
  title_url,
  title_cover
FROM
  sorted_titles
ORDER BY
  release_date DESC;