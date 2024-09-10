const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Routes utilisateur
app.use('/api/auth', userRoutes);

// Route protégée (exemple)
app.get('/api/protected', auth, (req, res) => {
  res.status(200).json({ message: 'Vous avez accédé à une route protégée !' });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
