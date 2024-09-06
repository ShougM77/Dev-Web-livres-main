// server.js
const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Route de test pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
    res.send('API Mon Vieux Grimoire fonctionne !');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
