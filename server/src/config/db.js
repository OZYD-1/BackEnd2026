import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config()
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
})

const connecTDB = async () => {
    try{
       const client = await pool.connect();
        console.log("postgreSQL connected successfully");
        client.release()
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}
export default connecTDB
export { pool }