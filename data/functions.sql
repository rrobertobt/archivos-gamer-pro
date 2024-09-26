CREATE OR REPLACE FUNCTION inventory.check_and_update_stock()
RETURNS TRIGGER AS $$
DECLARE
    current_store_stock integer;
	product_name text;
BEGIN
    -- Obtener el stock actual en la tienda para el producto y sucursal
    SELECT store_stock, p.name INTO current_store_stock, product_name
    FROM inventory.stocks s
    JOIN inventory.products p ON s.product_id = p.id
    WHERE s.product_id = NEW.product_id AND s.branch_id = (SELECT branch_id FROM sales.sales WHERE id = NEW.sale_id);

    -- Verificar si hay suficiente stock en la tienda
    IF current_store_stock < NEW.quantity THEN
        -- RAISE EXCEPTION 'No hay suficiente stock del producto "%". Stock actual: %, Cantidad solicitada: %, en la sucursal: %', 
        --                 product_name, current_store_stock, NEW.quantity, (SELECT branch_id FROM sales.sales WHERE id = NEW.sale_id);
		RAISE EXCEPTION 'No hay suficiente stock del producto "%". Stock actual: %', 
		product_name, current_store_stock;
    END IF;

    -- Actualizar el stock en la tienda (reducirlo)
    UPDATE inventory.stocks
    SET store_stock = store_stock - NEW.quantity
    WHERE product_id = NEW.product_id AND branch_id = (SELECT branch_id FROM sales.sales WHERE id = NEW.sale_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_check_store_stock
BEFORE INSERT ON sales.sales_details
FOR EACH ROW
EXECUTE FUNCTION inventory.check_and_update_stock();



CREATE OR REPLACE PROCEDURE inventory.transfer_stock(
    IN p_branch_id INTEGER,
    IN p_product_id INTEGER,
    IN p_amount INTEGER,
	IN p_store_aisle VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF (SELECT warehouse_stock FROM inventory.stocks 
        WHERE branch_id = p_branch_id AND product_id = p_product_id) < p_amount THEN
        RAISE EXCEPTION 'No hay suficientes existencias en bodega para este producto';
    END IF;

    UPDATE inventory.stocks
    SET warehouse_stock = warehouse_stock - p_amount,
        store_stock = store_stock + p_amount,
		store_aisle = COALESCE(p_store_aisle, store_aisle)
    WHERE branch_id = p_branch_id
    AND product_id = p_product_id;
END;
$$;