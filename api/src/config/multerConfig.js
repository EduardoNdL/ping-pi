const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const caminho = 'public/assets/uploads'
        cb(null, caminho)
    },
    filename: function (req, file, cb) {
        const nomeArquivo = Date.now() + "-" + file.originalname
        cb(null, nomeArquivo)
    }
})

const fileFilter = function (req, file, cb) {
    const tipos = ['image/jpeg', 'image/png', 'image/gif'];
    if (tipos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas.'));
    }
}


module.exports = multer({ storage, fileFilter });
