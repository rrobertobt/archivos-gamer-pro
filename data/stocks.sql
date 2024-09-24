WITH first_branch_games AS (
  SELECT id FROM inventory.products
  WHERE category_id = 1
  ORDER BY random()
  LIMIT 90
),
second_branch_games AS (
  SELECT id FROM inventory.products
  WHERE category_id = 1
  AND id NOT IN (SELECT id FROM first_branch_games)
  ORDER BY random()
  LIMIT 65
),
third_branch_games AS (
  SELECT id FROM inventory.products
  WHERE category_id = 1
  AND id NOT IN (SELECT id FROM first_branch_games UNION ALL SELECT id FROM second_branch_games)
  ORDER BY random()
  LIMIT 65
),
playstation_products AS (
  SELECT id FROM inventory.products WHERE name LIKE '%PlayStation%'
),
xbox_products AS (
  SELECT id FROM inventory.products WHERE name LIKE '%Xbox%'
),
nintendo_products AS (
  SELECT id FROM inventory.products WHERE name LIKE '%Nintendo%'
)

INSERT INTO inventory.stocks (product_id, branch_id, warehouse_stock, store_stock)
-- First branch: 90 video games + PlayStation products
SELECT id, 1, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM first_branch_games
UNION ALL
SELECT id, 1, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM playstation_products

-- Second branch: 65 video games + Xbox products
UNION ALL
SELECT id, 2, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM second_branch_games
UNION ALL
SELECT id, 2, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM xbox_products

-- Third branch: 65 video games + Nintendo products
UNION ALL
SELECT id, 3, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM third_branch_games
UNION ALL
SELECT id, 3, floor(random() * 100 + 1)::int, floor(random() * 100 + 1)::int FROM nintendo_products;


select * from inventory.stocks;