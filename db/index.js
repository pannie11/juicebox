const { Client } = require('pg'); //the pg module, aka node-postgres, is a nonblocking PostgreSQL client for nodejs. It is a collection of node.js modules for connecting with a PostgreSQL database

const client = new Client('postgres://localhost:5432/juicebox-dev'); //we get access to the database this way

// module.exports = {
//     client,
// }

async function createUser({
    username, 
    password,
    name, 
    location
}) {
    try {
        const { rows } = await client.query(`
            INSERT INTO users(username, password, name, location)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
        `, [username, password, name, location]);
        
        return rows
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    const { rows } = await client.query( //query is a request to the database to fetch info
        `SELECT id, username, name, location, active
            from users;`
    );
    return rows; //we getting id and username (and now name, location, and active status) of our users 
}

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
            `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    }
}

async function createPost({
    authorId,
    title,
    content
}) {
    try {

    } catch (error) {
        throw error;
    }
}

async function updatePost(id, {
    title,
    content, 
    active
}) {
    try {

    } catch (error) {
        throw error;
    }
}

async function getAllPosts() {
    try {

    } catch (error) {
        throw error;
    }
}
async function getPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM posts
        WHERE "authorId"=${ userId };
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT id, username, name, location, active 
        FROM users 
        WHERE id=${ userId }`) //was at least right on this part

        if (`rows.length` === 0) {
            return null
        } 

        user.posts = await getPostsByUser(userId);

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    client, 
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser, 
    getUserById
}

