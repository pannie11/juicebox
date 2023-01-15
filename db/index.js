const { Client } = require('pg'); //the pg module, aka node-postgres, is a nonblocking PostgreSQL client for nodejs. It is a collection of node.js modules for connecting with a PostgreSQL database

const client = new Client('postgres://localhost:5432/juicebox-dev'); //we get access to the database this way

// module.exports = {
//     client,
// }

async function getAllUsers() {
    const { rows } = await client.query( //query is a request to the database to fetch info
        `SELECT id, username
            from users;`
    );
    return rows; //we getting id and username of our users 
}

async function createUser({username, password}) {
    try {
        const rows = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING 
            RETURING *;
        `, [username, password]);
        
        return rows
    } catch (error) {
        throw error;
    }
}

module.exports = {
    client, 
    getAllUsers,
    createUser,
}

