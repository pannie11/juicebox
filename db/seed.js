const { client, getAllUsers, createUser } = require('./index'); //import them from index

async function testDB() {
    try {
        client.connect(); //connecting the client to the database

        // const result = await client.query(`SELECT * FROM users;`)
        // const {rows} = await client.query(`SELECT * FROM users;`)
        const users = await getAllUsers();
        console.log(users);

        // console.log(rows)
        // console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        client.end(); //this closes out the client connection
    }
}

testDB(); //function doesn't run unless we call it

async function dropTables(){ //this is gonna call a query which drops all tables from our database
    try {
        console.log('Starting to drop tables...');
        
        await client.query(`DROP TABLE IF EXISTS users`); 

        console.log('Finished dropping tables!')
    } catch (error) {
        console.error('Error dropping tables!')
        throw error; //passing the error to the function that calls dropTables
    }
}

async function createTables() { //calls a query that creates all the tables for our database
    try {
        console.log('Starting to build tables...');

        await client.query(`
            CREATE TABLE USERS (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL, 
                password varchar(255) NOT NULL
            );
        `);

        console.log('Finished building tables!')
    } catch (error) {
        console.error('Error building tables!')
        throw error; //passing the error up to the function that calls createTables
    }
}

async function createInitialUsers() {
    try {
        console.log('Starting to create users...');

        const albert = await createUser({ username: 'albert', password: 'bertie99'});
        console.log(albert);

        const sandra = await createUser({username: 'sandra', password: '2sandy4me'})

        const glamgal = await createUser({username: 'glamgal', password: 'soglam'})

        console.log('Finished creating users!');
    } catch (error) {
        console.error('Error creating users!');
        throw error;
    }
}

async function rebuildDB() { //this is the function that calls our createTables and dropTables functions
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error(error);
    } finally {
        client.end();
    }
}

async function testDB() {
    try {
        console.log('Starting to test database...');

        const users = await getAllUsers();
        console.log('getAllUsers:', users);

        console.log('Finished database tests!');
    } catch (error) {
        console.error('Error testing database!');
        throw error
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());