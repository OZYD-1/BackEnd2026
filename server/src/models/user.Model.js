import { pool } from "../config/db.js"

export const getAllUsers = async () => {
    const result = await pool.query(`select name, email, gender from users`)
    return result.rows
}
export const getUserById = async (userId) => {
    const result = await pool.query(`select * from users where id = $1`, [userId])
    return result.rows[0]
}
export const UpdatUserById = async (userId, phone_number, address, birth_date, gender, has_passport) => {
    const result = await pool.query(`update users set phone_number = $1, address = $2, birth_date = $3, gender = $4, has_passport = $5 where userid= $6 returning *`,
        [phone_number, address, birth_date, gender, has_passport, userId])
    result.rows[0]
}
export const deletUserById = async (userId) => {
    const result = await pool.query(`delete form users where userid = $1`, [userId])
}

export const findUserByEmail = async (email) => {
    const result = await pool.query(`select * from users where email = $1`, [email])
    return result.rows[0]
}
export const findUserByNationalId = async (national_id) => {
    const result = await pool.query(`select * from users where national_id = $1`, [national_id])
    return result.rows[0]
}