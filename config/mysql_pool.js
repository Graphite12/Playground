import mysql from 'mysql2/promise';
import { pool_config } from './dotenv_config.js';

const pool = mysql.createPool(pool_config);

export default pool;
