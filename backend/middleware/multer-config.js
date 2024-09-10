const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// Configuration de stockage avec Multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware pour redimensionner et compresser les images avec Sharp
const processImage = (req, res, next) => {
  if (!req.file) return next();
  
  const filename = `${Date.now()}-${req.file.originalname}`;
  sharp(req.file.buffer)
    .resize(500, 500) // Redimensionner à 500x500
    .toFormat('jpeg')
    .jpeg({ quality: 80 }) // Compression
    .toFile(path.join(__dirname, '../images', filename), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la compression de l\'image.' });
      }
      req.file.filename = filename; // Ajouter le nom du fichier à la requête
      next();
    });
};

module.exports = { upload, processImage };
