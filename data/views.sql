-- Top Articles
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    SUM(sd.quantity) AS total_quantity_sold
FROM 
    sales.sales_details sd
JOIN 
    inventory.products p ON sd.product_id = p.id
GROUP BY 
    p.id, p.name
ORDER BY 
    total_quantity_sold DESC
LIMIT 10;


--    
SELECT 
    c.id AS customer_id, 
    c.name AS customer_name, 
    SUM(sd.quantity * sd.unit_price) AS total_spent
FROM 
    customers.customers c
INNER JOIN 
    sales.sales s ON c.id = s.customer_id
INNER JOIN 
    sales.sales_details sd ON s.id = sd.sale_id
GROUP BY 
    c.id, c.name
ORDER BY 
    total_spent DESC
LIMIT 10;

-- Top Branches
SELECT 
    b.id AS branch_id, 
    b.name AS branch_name, 
    SUM(sd.quantity * sd.unit_price) AS total_income
FROM 
    inventory.branches b
INNER JOIN 
    sales.sales s ON b.id = s.branch_id
INNER JOIN 
    sales.sales_details sd ON s.id = sd.sale_id
GROUP BY 
    b.id, b.name
ORDER BY 
    total_income DESC
LIMIT 2;


-- Top Sales
SELECT 
    s.id AS sale_id, 
	s.date_sale,
    c.name AS customer_name, 
    SUM(sd.quantity * sd.unit_price) AS total_sale
FROM 
    sales.sales s
INNER JOIN 
    customers.customers c ON s.customer_id = c.id
INNER JOIN 
    sales.sales_details sd ON s.id = sd.sale_id
GROUP BY 
    s.id, c.name
ORDER BY 
    total_sale DESC
LIMIT 10;
