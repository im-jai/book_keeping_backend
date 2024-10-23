// Import required packages using ES module syntax
import express from "express";
import mysql from "mysql";

const app = express();
const PORT = process.env.PORT || 8800;

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost", // Your database host
  user: "root", // Your database username
  password: "root", // Your database password
  database: "books_keeping_db", // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Define the /books route
app.get("/books", (req, res) => {
  const getAllBooks = "SELECT * FROM books";

  db.query(getAllBooks, (err, data) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching books." });
    }
    return res.json(data);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
