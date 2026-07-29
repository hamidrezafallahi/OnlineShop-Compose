-- Keep identity sequences aligned after seeding explicit Ids.
SELECT setval(pg_get_serial_sequence('"Brands"', 'Id'), COALESCE((SELECT MAX("Id") FROM "Brands"), 1), true);
SELECT setval(pg_get_serial_sequence('"Categories"', 'Id'), COALESCE((SELECT MAX("Id") FROM "Categories"), 1), true);
SELECT setval(pg_get_serial_sequence('"Products"', 'Id'), COALESCE((SELECT MAX("Id") FROM "Products"), 1), true);
SELECT setval(pg_get_serial_sequence('"ProductOffers"', 'Id'), COALESCE((SELECT MAX("Id") FROM "ProductOffers"), 1), true);
SELECT setval(pg_get_serial_sequence('"Blogs"', 'Id'), COALESCE((SELECT MAX("Id") FROM "Blogs"), 1), true);
SELECT setval(pg_get_serial_sequence('"PaymentMethod"', 'Id'), COALESCE((SELECT MAX("Id") FROM "PaymentMethod"), 1), true);
SELECT setval(pg_get_serial_sequence('"ShippingMethods"', 'Id'), COALESCE((SELECT MAX("Id") FROM "ShippingMethods"), 1), true);
