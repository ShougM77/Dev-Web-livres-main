const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Pour générer des tokens JWT
const User = require('../models/User'); // Modèle de l'utilisateur

// Route pour l'inscription des utilisateurs (POST)
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // Hachage du mot de passe
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

// Route pour la connexion des utilisateurs (POST)
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET', // Remplace par une vraie clé secrète
            { expiresIn: '24h' } // Durée de validité du token
          );
          res.status(200).json({
            userId: user._id,
            token: token
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;