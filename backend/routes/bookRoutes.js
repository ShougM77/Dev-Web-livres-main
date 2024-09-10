const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const { upload, processImage } = require('../middleware/multer-config');

// Route pour afficher tous les livres (GET)
router.get('/', (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});

// Route pour créer un nouveau livre (POST)
router.post('/', upload.single('image'), processImage, (req, res, next) => {
  const bookObject = {
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };

  const book = new Book({
    ...bookObject
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Livre créé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
});

// Route pour modifier un livre (PUT)
router.put('/:id', upload.single('image'), processImage, (req, res, next) => {
  const bookObject = req.file ? 
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre modifié avec succès !' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
