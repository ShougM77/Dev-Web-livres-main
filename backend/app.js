const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const thingRoutes = require('./routes/thingRoutes'); // Importer les routes Thing
const userRoutes = require('./routes/userRoutes'); // Importer les routes utilisateurs
const bookRoutes = require('./routes/bookRoutes'); // Importer les routes Livres

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(
  'mongodb+srv://Mongotest:Mongotest@cluster0.4rsri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Utiliser les routes pour Thing
app.use('/api/things', thingRoutes);

// Utiliser les routes pour les utilisateurs
app.use('/api/auth', userRoutes);

// Utiliser les routes pour les livres
app.use('/api/books', bookRoutes);

// Middleware pour servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware pour gérer les erreurs 404 (non trouvé)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée !' });
});

// Démarrer le serveur
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = app;
