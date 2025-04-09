require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const BookSchema = new mongoose.Schema({ title: String });
const Book = mongoose.model('Book', BookSchema, 'Book');

// Seed simple pour test rapide
app.get('/books', async (req, res) => {
  const books = await Book.find();
  if (books.length === 0) {
    await Book.insertMany([{ title: "Livre A" }, { title: "Livre B" }]);
  }
  const allBooks = await Book.find();
  res.json(allBooks);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
