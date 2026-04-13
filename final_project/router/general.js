const express = require('express');
const axios = require('axios');
const public_users = express.Router();

const booksURL = "http://localhost:3000/books";

// Get all books (async/await)
public_users.get('/async/books', async (req, res) => {
    try {
        const response = await axios.get(booksURL);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book by ISBN (Promises)
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    axios.get(`${booksURL}`)
        .then(response => {
            const book = response.data[isbn];
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error fetching book" });
        });
});

// Get books by Author (async)
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(booksURL);
        const books = response.data;

        const result = Object.values(books).filter(
            book => book.author === author
        );

        res.json(result);
    } catch {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Get books by Title (async)
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(booksURL);
        const books = response.data;

        const result = Object.values(books).filter(
            book => book.title === title
        );

        res.json(result);
    } catch {
        res.status(500).json({ message
