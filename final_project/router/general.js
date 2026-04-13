const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = "http://localhost:3000";

// Get all books
router.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Get by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    const books = response.data;

    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Get by Author
router.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    const books = Object.values(response.data);

    const filtered = books.filter(
      b => b.author.toLowerCase() === req.params.author.toLowerCase()
    );

    if (filtered.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Get by Title
router.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    const books = Object.values(response.data);

    const filtered = books.filter(
      b => b.title.toLowerCase() === req.params.title.toLowerCase()
    );

    if (filtered.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books by title" });
  }
});

module.exports = router;
