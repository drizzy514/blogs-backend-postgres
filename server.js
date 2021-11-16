const express = require("express");
const { Pool  } = require ("pg");
const app = express();
const PORT = process.env || 2000;
const pool = new Pool({
    connectionString:"postgres://asylabiw:nhXSh5K6Qq6I_xWnPDZ3I3-ajCfOqb3q@fanny.db.elephantsql.com/asylabiw"
})
app.get("/comments" , async (req, res)=> {
    const client = await pool.connect()
    const {rows } = await client.query(`
    SELECT 
        comment_text as comment,
        users_name as commentauthor,
        comment_date_added as addedcomment
            FROM users
                INNER JOIN
                    comments 
                        ON users.users_id = comments.comment_author;
    `);
    client.release()
    res.send(rows)
})
app.get("/users" , async (_, res) => {
    const client = await pool.connect();
    const { rows } = await client.query(`
    SELECT 
       users_name as username,
       users_email as useremail,
        date_added as useradded
            FROM users
                INNER JOIN
                    comments 
                        ON users.users_id = comments.comment_author;

        `);
        client.release();
        res.send(rows);
});







app.listen(PORT, ()=> {
    console.log("server is runnning")
})
