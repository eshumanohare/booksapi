const express = require("express");
const books_routes = require("./routes/books.js");
const user_routes = require("./routes/user.js");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/books", books_routes);
app.use("/user", user_routes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
