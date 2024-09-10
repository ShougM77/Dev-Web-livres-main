const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing'); // Importer le modèle Thing

// Route pour créer un nouvel objet Thing
router.post('/', (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price
  });

  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

// Route pour obtenir tous les objets Thing
router.get('/', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

// Route pour obtenir un objet Thing spécifique par son ID
router.get('/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

// Route pour mettre à jour un objet Thing
router.put('/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price
  });

  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

// Route pour supprimer un objet Thing
router.delete('/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;