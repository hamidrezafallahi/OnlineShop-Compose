-- Optional clean step for sample demo data.
-- WARNING: CASCADE may also clear dependent rows (images, tags, offers, etc.).
TRUNCATE TABLE
  "ProductOffers",
  "Products",
  "Blogs",
  "Categories",
  "Brands",
  "PaymentMethod",
  "ShippingMethods"
RESTART IDENTITY CASCADE;
