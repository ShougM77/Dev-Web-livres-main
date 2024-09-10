const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL de l'image du livre
  publishedDate: { type: Date, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
