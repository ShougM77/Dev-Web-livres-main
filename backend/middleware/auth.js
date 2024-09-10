const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token de l'en-tête Authorization
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérifier et décoder le token
    const userId = decodedToken.userId;
    req.auth = { userId }; // Ajouter l'userId à la requête
    next(); // Continuer vers la route protégée
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée !' });
  }
};
