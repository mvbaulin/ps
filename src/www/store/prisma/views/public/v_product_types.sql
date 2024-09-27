SELECT
  DISTINCT TRIM(
    BOTH
    FROM
      unnest(string_to_array(product_type, ',' :: text))
  ) AS product_type
FROM
  titles
WHERE
  (product_type IS NOT NULL)
ORDER BY
  (
    TRIM(
      BOTH
      FROM
        unnest(string_to_array(product_type, ',' :: text))
    )
  );