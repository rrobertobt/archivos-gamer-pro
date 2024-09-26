-- Top Articles
CREATE VIEW sales.toparticles AS
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
ALTER TABLE sales.toparticles OWNER TO robertob;


-- Top Customers
CREATE VIEW sales.topcustomers AS
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
ALTER TABLE sales.topcustomers OWNER TO robertob;

-- Top Branches
CREATE VIEW sales.topbranches AS
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
ALTER TABLE sales.topbranches OWNER TO robertob;


-- Top Sales
CREATE VIEW sales.topsales AS
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
ALTER TABLE sales.topsales OWNER TO robertob;


CREATE VIEW sales.all_sales AS
SELECT 
    s.id AS sale_id,
    s.date_sale,
    c.name AS customer_name,
    e.name AS employee_name,
    SUM(sd.quantity * sd.unit_price) AS total_sale_value
FROM 
    sales.sales s
LEFT JOIN 
    customers.customers c ON s.customer_id = c.id
INNER JOIN 
    sales.sales_details sd ON s.id = sd.sale_id
INNER JOIN 
    employees.employees e ON s.employee_id = e.id
GROUP BY 
    s.id, s.date_sale, c.name, e.name
ORDER BY 
    s.date_sale ASC;
ALTER TABLE sales.all_sales OWNER TO robertob;