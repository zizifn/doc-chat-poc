create virtual table vss_articles using vss0(
  headline_embedding(384),
  description_embedding(384),
);