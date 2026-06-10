const express = require('express');
const mysql = require('mysql2/promise'); // needed do to using mariadb, download using 'mysql2'
const bcrypt = require('bcrypt'); //to be able to protect passwords
const session = require('express-session');
const app = express();
const port = 3000; // What port is in use

const pool = mysql.createPool({ // used do to maria.db being used
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root', //later: put in an env file for safty
    database: 'oybitenas', //change based on what database is used
    connectionLimit: 5,
    multipleStatements: true,
});

/*
-------------------------------
    MIDDLEWARE
-------------------------------
*/


app.use(express.static('Public')); //Middleware to serv static files from public
app.use(express.json()); //middleware for parse JSON from request body
app.use(express.urlencoded({extended: true})); //DO NOT REMOVE!!! allows you to get info from the search bar

const path = require('path'); //handles the file paths

//if the database dose not exist. Create it ⤵
pool.query(`
CREATE TABLE IF NOT EXISTS db_role (
    db_role_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    db_name TEXT
);

    CREATE TABLE IF NOT EXISTS db_user (
    db_user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    db_username TEXT UNIQUE,
    db_lastname TEXT,
    db_firstname TEXT,
    db_password TEXT,
    db_email TEXT,
    db_role_id INTEGER,
    FOREIGN KEY (db_role_id) REFERENCES db_role(db_role_id)
);

CREATE TABLE IF NOT EXISTS db_helpTicket (
    db_ticket_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    db_title TEXT,
    db_description TEXT,
    db_date TEXT,
    db_importance TEXT,
    db_status TEXT,
    db_user_id INTEGER,
    FOREIGN KEY (db_user_id) REFERENCES db_user(db_user_id)
);
`);

app.use(
    session({ //to avoid having id in the url for safty and readability
        secret: "secretKey", //incrypt the session-ID (move to an env file for safty)
        resave: false, // Won't save a unchanged session (to avoid unaceserry saves)
        saveUninitialized: false, // Won't save a empty session
        cookie: {
            secure: false, // using http whitch is not secure, and therfor is this sett to false. Change to 'true' if using https
            maxAge: 1000 * 60 * 60 // session expier after 1 houre 
        },
    })
);

/*
-------------------------------
    Requirements 
-------------------------------
*/

function requireLogin_(req, res, next) { //user must be logd in and have a session
    if (!req.session.sessionUser_) {//if user dosn't have a session
        return res.redirect("/"); //redirect to /index.html
    }
    next(); //if they are logd in, then let them continue
}

//everything under /private requires user to be logd in ⤵
app.use('/Private', requireLogin_, express.static(path.join(__dirname, "Private"))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html")); //sets where / takes user
});

//Middleware for logging all incoming and outgoing requests (for debugging)
//Too log timestamp, http-method, body and url and what user
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)} - user: ${req.session.sessionUser_ ? req.session.sessionUser_.db_firstname : "Nothing"}`
    );
    next();
});

/*
-------------------------------
    USER 
-------------------------------
*/

app.post('/createUser_', async (req, res) => { //adds new users to database
    const { username_, password_, firstname_, lastname_, role_} = req.body; //get the username, password, first and lastname from the html-form in index.html

    const [rows_] = await pool.query('SELECT * FROM db_user WHERE db_username = ?', [username_]); //rows_ checks if the username is taken or free. the [] is because it is checking multiple rows. (maria.db exlusiv)
    if (rows_.length > 0) { //check if username is taken (if more then 0)
        return res.status(400).json({ message: "A user with this username alredy exist. Please select a different username"}); //stops a different user from picking it
    }

    try {
        const saltRounds_ = 10; //inrypts the password using saltrounds
        const hashPassword_ = await bcrypt.hash(password_, saltRounds_); //the hashPassword is the password that gets saved to the db
        const [stmt_] = await pool.execute( //cheking multiple rows, so use []. (Query = get, execute = do)
        'INSERT INTO db_user (db_username, db_password, db_firstname, db_lastname, db_role_id) VALUES (?, ?, ?, ?, ?)', 
            [username_, hashPassword_, firstname_, lastname_, role_] // Mariadb uses [varible] insted of run/get to send querys to/from database 
        );
        res.status(201).json({ message: "New user added", id: stmt_.insertId }); //lets user know they where added sucsesfully
    } catch (error){ //if an error happens
        console.log(error);
        res.status(500).json({message: "There was a problem with adding user. Please try again."}); //informs user of error
    }
});


app.post('/login_', async (req, res) => { //users with an account can log in
    const {inUsername_, inPassword_} = req.body; // retrieves what user puts in form 

    const [users_] = await pool.query('SELECT * FROM db_user WHERE db_username = ?', [inUsername_]); // checks if there is a matching username
    if (users_.length === 0) { // if there is not then user cant log in
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const user_ = users_[0]; //gets first user object (turns an array into an object)
    const passwordMatch_ = await bcrypt.compare(inPassword_, user_.db_password) //checks if the password matches the incrypted password
    if (!passwordMatch_) { //if they dont match, user can't log in
        return res.status(401).json({ message: "Invalid username or password" });
    }
    req.session.sessionUser_ = { //if they do, get info for session
    username_ : user_.db_username,
    firstname_ : user_.db_firstname,
    lastname_ : user_.db_lastname,
    userId_ : user_.db_user_id,
    role_ : String(user_.db_role_id), //String turns 3 into '3'. Helps normalizing the role value.
};
    return res.redirect(`/Private/dashboard.html`); //send user to dashboard.html when logd in
});


/*
-------------------------------
    TICKET 
-------------------------------
*/

//user can create a help ticket
app.post('/helpTicket_', async (req, res) => { 
    const {title_, info_, deadline_} = req.body; // retrieves what user puts in html-form 
    const user_id = req.session.sessionUser_.userId_; //gets the id from session
    const status_ = "open";
    try {
        const [statement_] = await pool.execute( //cheking multiple rows, so use []. (Query = get, execute = do)
        'INSERT INTO db_helpticket (db_title, db_description, db_importance, db_status, db_user_id) VALUES (?, ?, ?, ?, ?)', 
            [title_, info_, deadline_, status_, user_id] // Mariadb uses [varible] insted of run/get to send querys to/from database 
        );

        res.status(201).json({ message: "New ticket added", id: statement_.insertId }); //lets user know they where added sucsesfully
    } catch (error){ //if an error happens
        console.log(error);
        res.status(500).json({message: "There was a problem with adding the ticket. Please try again."}); //informs user of error
    }
});

/*
-------------------------------
    ROLES 
-------------------------------
*/

//Middleware used later to say what role is needed to access different parts 
function requireRole_(...roles) { //... allows any number of inputs to be accepted by making them an array
    return (req, res, next) => { 
        if (!req.session.sessionUser_) { //if there is no session, you get thrown back to the login site 
            return res.redirect("/");
        }
        const currentRole = String(req.session.sessionUser_.role_); //String normalizes the role id
        const allowedRoles = roles.map(String); // all imputs in roles gets stringefied using map (map can apply a transform function to every element)
        if (!allowedRoles.includes(currentRole)) { //if the current role and allowd role dont match, give a no access massage
            return res.status(403).json({ message: "No access" });
        }
        next();
    };
}


// Beskyttet rute som viser alle data om brukeren (kun egne data)
app.get("/api/myPage_", requireLogin_, async (req, res) => {
    const userId_ = req.session.sessionUser_.userId_;
    const [rows_] = await pool.query(
        'SELECT db_user_id, db_firstname, db_lastname , db_password, db_role_id FROM db_user WHERE db_user_id = ?', 
        [userId_]
    );

    if (rows_.length === 0) {
        // === means strict equality operator
        return res.status(404).json({ message: "User not found" });
    }

    const row = rows_[0];
    const user_ = {
        userId_: row.db_user_id,
        firstname_: row.db_firstname,
        lastname_: row.db_lastname,
        password_: row.db_password,
        role_: String(row.db_role_id),
    };
    res.json({ user_ });
});

//Admine-rout: get all information on every user
app.get("/api/admin/users_", requireRole_('1'), async (req, res) => { //only admin have access here
    const [rows_] = await pool.execute(
        'SELECT db_user_id, db_username, db_firstname, db_lastname, db_role_id FROM db_user'
    );
    res.json({ users_: rows_ });
});

// Support-rout: get first and last name on every user
app.get("/api/support/users_", requireRole_('3', '1'), async (req, res) => { // both support and admin have access here
    const [rows_] = await pool.execute('SELECT db_firstname, db_lastname FROM db_user');
    res.json({ users_: rows_});
});
// Ticket-rout: Get all ticket info and show to admin/support
// had to be seperated from support-rout do to only one working at a time
app.get("/api/ticket/users_", requireRole_('3', '1'), async (req, res) => { // both support and admin have access here
    const [rows] = await pool.execute(
        'SELECT db_ticket_id, db_title, db_description, db_importance, db_status FROM db_helpticket'
    );
    res.json({ users: rows});
});

app.get("/api/userTicket/users_", requireLogin_, async (req, res) => { 
    const userId_ = req.session.sessionUser_.userId_;
    const [tRows_] = await pool.execute( 'SELECT db_ticket_id, db_title, db_description, db_importance, db_status FROM db_helpticket WHERE db_user_id = ?', 
        [userId_]);
    res.json({ ticket: tRows_});
});


app.put('/api/updateTicketStatus_/:id', requireRole_('3', '1'), async (req, res) => {
    const { status_ } = req.body;
    const ticketId = req.params.id;
    try {
        await pool.execute('UPDATE db_helpticket SET db_status = ? WHERE db_ticket_id = ?', [status_, ticketId]);
        res.json({ message: "Status updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update status" });
    }
});


// Rout to log off 
app.post("/api/logout_", (req, res) => {
    req.session.destroy(); //without a session, user isn't allowed on /Private
    res.json({ message: "You are now loged out" });
});

app.delete('/api/deleteTicket_/:id', requireLogin_, async (req, res) => {
    const target_id_ = req.params.id;
    try {
        await pool.execute('DELETE FROM db_helpticket WHERE db_ticket_id = ?', [target_id_]);
        res.json({ message: "ticket deleted" });
    } catch (error_) {
        console.error(error_);
        res.status(500).json({ message: "Failed to delete ticket" });
    }
});

// app.post("/api/delete_", (req, res) => {
//     req.session.destroy(); //without a session, user isn't allowed on /Private
//     res.json({ message: "You are now loged out" });
// });

app.listen(port, () => { //starts up the server and says where to find it
    console.log(`Website running at http://localhost:${port}`);
});