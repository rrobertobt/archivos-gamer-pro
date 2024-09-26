-- Script para creación de la base de datos en PostgreSQL

CREATE DATABASE gamer_pro_xela_db;

\c gamer_pro_xela_db;

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA IF NOT EXISTS employees;
CREATE SCHEMA IF NOT EXISTS customers;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS sales;

CREATE TABLE inventory.categories (
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    description text
);

CREATE TABLE inventory.branches (
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    address character varying(256) NOT NULL
);

CREATE TABLE inventory.products (
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    -- stock integer NOT NULL,
    -- branch_id integer NOT NULL REFERENCES inventory.Branches(id),
    category_id integer NOT NULL REFERENCES inventory.Categories(id)
);

CREATE TYPE inventory.productLocation AS ENUM ('warehouse', 'store');

CREATE TABLE inventory.stocks (
    id SERIAL PRIMARY KEY,
    product_id integer NOT NULL REFERENCES inventory.Products(id),
    branch_id integer NOT NULL REFERENCES inventory.Branches(id),
    warehouse_stock integer NOT NULL DEFAULT 0,
    store_stock integer NOT NULL DEFAULT 0
  
    warehouse_aisle character varying(20) NOT NULL DEFAULT 'A0',
    store_aisle character varying(20) NOT NULL DEFAULT 'A0',
);

CREATE TABLE employees.roles (
    id SERIAL PRIMARY KEY,
    name character varying(50) NOT NULL,
    description text
);

CREATE TABLE employees.employees (
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    username character varying(100) NOT NULL UNIQUE,
    encrypted_password character varying(100) NOT NULL,
    role_id integer NOT NULL REFERENCES employees.Roles(id),
    branch_id integer NOT NULL REFERENCES inventory.Branches(id),
    assigned_checkout integer NOT NULL DEFAULT -1
);

CREATE TYPE customers.creditPointsType AS ENUM ('common', 'gold', 'platinum', 'diamond');

CREATE TABLE customers.credit_points_cards (
    id SERIAL PRIMARY KEY,
    type customers.creditPointsType NOT NULL,
    points integer NOT NULL DEFAULT 0,
    date_issue date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE customers.customers (
    id SERIAL PRIMARY KEY,
    nit bigint NOT NULL UNIQUE,
    name character varying(100) NOT NULL,
    phone character varying(10) NOT NULL,
    points_card_id integer REFERENCES customers.credit_points_cards(id)
);


CREATE TABLE sales.sales (
    id SERIAL PRIMARY KEY,
    date_sale date NOT NULL DEFAULT CURRENT_DATE,

    -- total debería ser calculado por la suma de los detalles de venta
    -- total numeric(10, 2) NOT NULL,
    -- tambien existe el total sin descuento (si aplicara)
    -- total_without_discount numeric(10, 2) NOT NULL,

    branch_id integer NOT NULL REFERENCES inventory.branches(id),
    customer_id integer REFERENCES customers.customers(id),
    employee_id integer NOT NULL REFERENCES employees.employees(id)
);

CREATE TABLE sales.sales_details (
    id SERIAL PRIMARY KEY,
    sale_id integer NOT NULL REFERENCES sales.sales(id),
    product_id integer NOT NULL REFERENCES inventory.Products(id),
    quantity integer NOT NULL,
    unit_price numeric(10, 2) NOT NULL
);




