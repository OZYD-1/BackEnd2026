import pool from '../config/db.js';

export const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

export const getCategoryById = async (catid) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [catid]);
  return result.rows[0];
};

export const createCategory = async (name, description, category_seatnumber) => {
  const result = await pool.query(
    'INSERT INTO categories (name, description, category_seatnumber) VALUES ($1, $2, $3) RETURNING *',
    [name, description, category_seatnumber]
  );
  return result.rows[0];
};

export const updateCategory = async (catid, name, description, category_seatnumber) => {
    const result = await pool.query(
        'UPDATE categories SET name = $1, description = $2, category_seatnumber = $3 WHERE id = $4 RETURNING *',
        [name, description, category_seatnumber, catid]
    );
    return result.rows[0];
}

export const deleteCategory = async (catid) => {
    await pool.query('DELETE FROM categories WHERE id = $1', [catid]);
}