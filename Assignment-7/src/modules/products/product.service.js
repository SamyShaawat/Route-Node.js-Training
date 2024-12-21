import connection from "../../DB/connectionDB.js";


export const addProduct = (req, res) => {
    const { name, stock, isDeleted, price, userId } = req.body;
    connection.execute(`select * from products where name = '${name}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on select query', error: err.message });
        }
        if (result.length > 0) {
            return res.status(409).json({ message: 'Product already exists.' });
        }

        connection.execute(`insert INTO products (name , stock , isDeleted , price, userId)
                            VALUES ('${name}', '${stock}', '${isDeleted}', '${price}', '${userId}')`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error on insert query', error: err.message });
                }
                // console.log(result);
                if (result.affectedRows > 0) {
                    res.status(201).json({ message: 'Product added successfully.', productId: result.insertId });
                } else {
                    res.status(400).json({ message: 'Failed to add the product' });
                }
            });
    });
};

export const softDelete = (req, res) => {
    const { id } = req.params;
    connection.execute(`UPDATE products SET isDeleted = true WHERE id = '${id}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on update query', error: err.message });
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'No Product found.' });
        }
        res.status(200).json({ message: 'Product soft-deleted successfully.' });
    }
    );
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    connection.execute(`DELETE FROM products WHERE id = '${id}'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on delete query', error: err.message });
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: 'No Product found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    }
    );
};

export const searchProducts = (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: 'Product name query is required' });
    }
    connection.execute(`SELECT * FROM products WHERE name LIKE '%${name}%'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on SELECT query', error: err.message });
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'No Product found.' });
        }
        res.status(200).json({ products: result });
    }
    );
};

export const getProductsByIds = (req, res) => {
    const { ids } = req.query;

    if (!ids) {
        return res.status(400).json({ message: 'IDs query parameter is required' });
    }
    connection.execute(`SELECT id, name, price FROM products WHERE id in (${ids})`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on SELECT query', error: err.message });
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'No products found for the given IDs' });
        }
        res.status(200).json({ products: result });
    });
};

export const getAllNotSoftDeleted = (req, res) => {
    connection.execute(`SELECT name AS productName, price AS cost FROM products WHERE isDeleted = 'false'`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error on SELECT query', error: err.message });
        }
        if (result.length == 0) {
            return res.status(404).json({ message: 'No products found.' });
        }
        res.status(200).json({ products: result });
    });
};