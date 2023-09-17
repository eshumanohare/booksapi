const express = require("express");
const router = express.Router();

let books = [
  {
    ISBN: "978-0-123456-78-9",
    author: "John Smith",
    title: "The Great Adventure",
    review:
      "This book is a thrilling adventure that kept me on the edge of my seat from start to finish. John Smith's storytelling is superb, and I couldn't put it down. Highly recommended!",
  },
];
router.get("/", (req, res) => {
  res.send(JSON.stringify({ books }, null, 4));
});

router.get("/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  const filtered_books = books.filter((book) => book.ISBN === ISBN);
  if (filtered_books.length > 0) {
    res.send(JSON.stringify({ filtered_books }, null, 4));
  } else {
    res.send("Incorrect ISBN\n");
  }
});

router.get("/author/:author", (req, res) => {
  const author = decodeURIComponent(req.params.author);

  const filtered_books = books.filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.send("Incorrect author\n");
  }
});

router.get("/title/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);

  const filtered_books = books.filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.send("Incorrect title\n");
  }
});

router.get("/title/:title/review", (req, res) => {
  const title = decodeURIComponent(req.params.title);

  const filtered_books = books.filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );
  if (filtered_books.length > 0) {
    res.send(filtered_books.map((book) => book.review));
  } else {
    res.send("Incorrect title\n");
  }
});

router.put("/modify/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const review = req.query.review;

  const book = books.filter((book) => book.title === title)[0];
  book.review = review;
  res.send(`Updated Book: ${JSON.stringify({ book }, null, 4)}`);
});

router.delete("/delete/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  if (title) {
    const book = books.filter((book) => book.title != title);
    books = book;

    res.send(`deleted Book: ${JSON.stringify({ book }, null, 4)}`);
  } else {
    res.send("Book not found");
  }
});

router.post("/add", (req, res) => {
  const book = {
    ISBN: decodeURIComponent(req.query.ISBN),
    author: decodeURIComponent(req.query.author),
    title: decodeURIComponent(req.query.title),
    review: decodeURIComponent(req.query.review),
  };
  books.push(book);
  res.send(`Book Added: ${JSON.stringify({ book }, null, 4)}`);
});

module.exports = router;
