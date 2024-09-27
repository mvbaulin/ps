SELECT
  DISTINCT TRIM(
    BOTH
    FROM
      unnest(string_to_array(genres, ',' :: text))
  ) AS genre
FROM
  titles
WHERE
  (genres IS NOT NULL)
ORDER BY
  (
    TRIM(
      BOTH
      FROM
        unnest(string_to_array(genres, ',' :: text))
    )
  );