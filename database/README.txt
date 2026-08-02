# Sample SQL seeds (product-agnostic demo data)
#
# These seeds demonstrate a generic online shop catalog:
# brands, categories, products, offers, blogs, payment & shipping methods.
# They are NOT tied to perfume, crystal, steel, or any single vertical.
# Replace or extend them per client store without changing domain schema.
#
# Apply with one command (Docker + PostgreSQL must be running):
#   Windows:  .\database\seed.ps1
#   Windows:  .\database\seed.ps1 -Clean
#   Linux/macOS:  ./database/seed.sh
#   Linux/macOS:  ./database/seed.sh --clean
#
# What happens:
#   1) Optional: 00_truncate_sample_data.sql clears catalog/demo tables
#   2) Applies every NN_*.sql in order (01 brands → 07 shipping)
#   3) 99_reset_sequences.sql aligns PostgreSQL sequences with MAX(Id)
#
# Important:
#   - SQL seeds use FIXED primary keys (Id = 1..N).
#   - Re-running without -Clean / --clean usually fails with duplicate key errors.
#   - Requires postgres container from docker-compose.dev.yml
