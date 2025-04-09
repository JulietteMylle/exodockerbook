require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const BookSchema = new mongoose.Schema({ title: String });
const Book = mongoose.model('Book', BookSchema, 'books');

// Seed simple pour test rapide
app.get('/books', async (req, res) => {
  await Book.deleteMany({});  // Effacer les livres existants (pour tester l'insertion)
  await Book.insertMany([{ title: "Livre A" }, { title: "Livre B" }]);  // Insérer de nouveaux livres
  const allBooks = await Book.find();  // Récupérer tous les livres après insertion
  res.json(allBooks);
});
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
