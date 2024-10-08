INSERT INTO sales.sales (id, date_sale, used_points, branch_id, customer_id, employee_id) VALUES (1, '2024-09-26', 0, 1, 8, 1),
  (2, '2024-09-26', 0, 1, NULL, 1),
  (3, '2024-09-26', 0, 1, 6, 1),
  (4, '2024-09-26', 0, 1, NULL, 1),
  (5, '2024-09-26', 0, 1, NULL, 1),
  (6, '2024-09-26', 0, 2, 5, 12),
  (7, '2024-09-26', 0, 2, NULL, 12),
  (8, '2024-09-26', 0, 2, NULL, 12),
  (9, '2024-09-26', 0, 2, 5, 12),
  (10, '2024-09-26', 0, 2, 5, 12),
  (11, '2024-09-26', 0, 3, NULL, 23),
  (12, '2024-09-26', 0, 3, NULL, 23),
  (13, '2024-09-26', 0, 3, NULL, 23),
  (14, '2024-09-26', 0, 3, NULL, 23),
  (15, '2024-09-26', 0, 3, NULL, 23),
  (16, '2024-09-26', 0, 1, 9, 1);

  INSERT INTO sales.sales_details (id, sale_id, product_id, quantity, unit_price) VALUES (1, 1, 7, 1, 93.89),
(2, 1, 38, 1, 10.39),
(3, 2, 17, 5, 69.59),
(4, 3, 94, 1, 66.95),
(5, 3, 308, 3, 24.99),
(6, 4, 108, 1, 46.89),
(7, 5, 252, 2, 58.29),
(8, 6, 315, 2, 219.99),
(9, 7, 229, 1, 75.39),
(10, 8, 317, 5, 29.99),
(11, 9, 76, 2, 48.09),
(12, 10, 90, 7, 34.89),
(13, 11, 321, 1, 349.99),
(14, 12, 122, 1, 51.59),
(15, 13, 139, 3, 67.20),
(16, 14, 324, 1, 89.99),
(17, 15, 324, 1, 89.99),
(18, 16, 38, 1, 10.39);